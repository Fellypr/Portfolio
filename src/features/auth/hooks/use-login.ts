'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { postApiUsersLogin } from '@/api/generated/hooks/users/users';
import type {
  LoginRequestDto,
  AuthResponseDto,
} from '@/api/generated/interfaces';
import type { LoginCredentials } from '../types/auth.types';
import { ApiError } from '@/api/custom-fetch';

export interface UseLoginOptions {
  redirectTo?: string;
  onSuccess?: (data: AuthResponseDto) => void;
  onError?: (error: Error) => void;
}

// Sanitização contra ataques de Open Redirect
function getSafeRedirectUrl(targetUrl: string | undefined | null, fallback: string): string {
  if (!targetUrl) return fallback;
  if (
    targetUrl.startsWith('/') &&
    !targetUrl.startsWith('//') &&
    !targetUrl.includes('\\')
  ) {
    return targetUrl;
  }
  return fallback;
}

export function useLogin(options?: UseLoginOptions) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<AuthResponseDto | null>(null);
  const router = useRouter();

  const mutateAsync = useCallback(
    async (credentials: LoginCredentials): Promise<AuthResponseDto> => {
      setIsPending(true);
      setError(null);

      try {
        const payload: LoginRequestDto = {
          username: credentials.username || credentials.email || '',
          password: credentials.password,
        };

        const response = await postApiUsersLogin(payload);

        if (response.status >= 400) {
          const errorData = response.data as { mensagem?: string; message?: string } | undefined;
          const errorMessage =
            errorData?.mensagem ||
            errorData?.message ||
            `Falha na autenticação (código: ${response.status})`;

          throw new ApiError(
            response.status,
            'Unauthorized',
            response.data,
            response.headers,
            errorMessage
          );
        }

        const authData = response.data as AuthResponseDto;
        const jwtToken = authData?.token;

        // Persistência síncrona e assíncrona do token para Client e Server
        if (jwtToken) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', jwtToken);
            document.cookie = `auth_session_token=${encodeURIComponent(jwtToken)}; path=/; max-age=${60 * 60 * 8}; SameSite=Lax`;
          }

          try {
            await fetch('/api/auth/session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: jwtToken }),
            });
          } catch {
            // Cookie local já fixado como fallback
          }
        }

        setData(authData);

        if (options?.onSuccess) {
          options.onSuccess(authData);
        }

        const finalRedirect = getSafeRedirectUrl(options?.redirectTo, '/174464Fe');
        router.push(finalRedirect);
        router.refresh();

        return authData;
      } catch (err: unknown) {
        const appError =
          err instanceof Error
            ? err
            : new Error('Ocorreu um erro desconhecido durante o login.');

        setError(appError);

        if (options?.onError) {
          options.onError(appError);
        }

        throw appError;
      } finally {
        setIsPending(false);
      }
    },
    [options, router]
  );

  return {
    login: mutateAsync,
    mutateAsync,
    isPending,
    isLoading: isPending,
    error,
    data,
  };
}
