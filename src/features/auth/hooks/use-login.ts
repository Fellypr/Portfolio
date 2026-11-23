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
        setData(authData);

        if (options?.onSuccess) {
          options.onSuccess(authData);
        }

        if (options?.redirectTo) {
          router.push(options.redirectTo);
        }

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
