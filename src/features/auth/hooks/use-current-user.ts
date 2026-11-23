'use client';

import { useState, useEffect, useCallback } from 'react';
import { getApiUsersMe } from '@/api/generated/hooks/users/users';
import type { UserResponseDto } from '@/api/generated/interfaces';
import { ApiError } from '@/api/custom-fetch';

export interface UseCurrentUserOptions {
  enabled?: boolean;
}

/**
 * Hook de consulta do usuário atual 100% nativo com Fetch.
 * Compatível com o React Compiler (sem cascading renders via setState síncrono no useEffect).
 */
export function useCurrentUser(options?: UseCurrentUserOptions) {
  const isEnabled = options?.enabled ?? true;

  const [data, setData] = useState<UserResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(isEnabled);
  const [error, setError] = useState<Error | null>(null);

  // Efeito assíncrono estritamente desacoplado de chamadas síncronas de setState
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    let isMounted = true;

    getApiUsersMe()
      .then((response) => {
        if (!isMounted) return;

        if (response.status === 401) {
          throw new ApiError(
            401,
            'Unauthorized',
            response.data,
            response.headers,
            'Sessão expirada ou usuário não autenticado.'
          );
        }

        if (response.status >= 400) {
          throw new ApiError(
            response.status,
            'Error',
            response.data,
            response.headers,
            'Não foi possível obter os dados do perfil.'
          );
        }

        setData(response.data as UserResponseDto);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        const appError =
          err instanceof Error
            ? err
            : new Error('Erro ao carregar dados do usuário.');

        setError(appError);
        setData(null);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isEnabled]);

  // Função manual para refetch sob demanda (acionada por callbacks do usuário)
  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getApiUsersMe();

      if (response.status === 401) {
        throw new ApiError(
          401,
          'Unauthorized',
          response.data,
          response.headers,
          'Sessão expirada ou usuário não autenticado.'
        );
      }

      if (response.status >= 400) {
        throw new ApiError(
          response.status,
          'Error',
          response.data,
          response.headers,
          'Não foi possível obter os dados do perfil.'
        );
      }

      const userData = response.data as UserResponseDto;
      setData(userData);
      return userData;
    } catch (err: unknown) {
      const appError =
        err instanceof Error
          ? err
          : new Error('Erro ao carregar dados do usuário.');

      setError(appError);
      setData(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    user: data,
    isLoading,
    error,
    refetch,
  };
}
