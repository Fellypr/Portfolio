'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../schemas/login-schema';
import { useLogin } from './use-login';
import type { AuthResponseDto } from '@/api/generated/interfaces';

export interface UseLoginFormOptions {
  redirectTo?: string;
  onSubmitSuccess?: (data: AuthResponseDto) => void;
}

/**
 * Hook dedicado que encapsula 100% da lógica de negócio e estado do formulário de login.
 * Separação de responsabilidades (SoC): deixa a view (login-screen.tsx) puramente declarativa.
 */
export function useLoginForm(options?: UseLoginFormOptions) {
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const { mutateAsync: login, isPending } = useLogin({
    redirectTo: options?.redirectTo ?? '/174464Fe',
    onSuccess: (data) => {
      options?.onSubmitSuccess?.(data);
    },
  });

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isLoading = isSubmitting || isPending;

  const handleFormSubmit = async (data: LoginFormData) => {
    setSubmissionError(null);
    try {
      await login(data);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmissionError(err.message);
      } else {
        setSubmissionError('Ocorreu um erro inesperado ao realizar o login.');
      }
    }
  };

  const onSubmit = hookFormSubmit(handleFormSubmit);

  return {
    register,
    onSubmit,
    errors,
    isLoading,
    submissionError,
    clearError: () => setSubmissionError(null),
  };
}
