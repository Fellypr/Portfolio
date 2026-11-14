'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/ui/form-input';
import { loginSchema, type LoginFormData } from './schemas/login-schema';

export interface LoginScreenProps {
  onSubmitSuccess?: (data: LoginFormData) => void;
  onNavigateToRegister?: () => void;
  onNavigateToForgotPassword?: () => void;
}

export function LoginScreen({
  onSubmitSuccess,
  onNavigateToRegister,
  onNavigateToForgotPassword,
}: LoginScreenProps) {
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    setSubmissionError(null);
    try {
      if (onSubmitSuccess) {
        await onSubmitSuccess(data);
      }
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmissionError(err.message);
      } else {
        setSubmissionError('Ocorreu um erro inesperado ao realizar o login.');
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-md">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Acesse sua conta
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Insira suas credenciais para continuar
          </p>
        </header>

        {submissionError && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-500/20 bg-red-950/30 p-3 text-sm text-red-400"
          >
            {submissionError}
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-5">
          <FormInput
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            disabled={isSubmitting}
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="space-y-1">
            <FormInput
              label="Senha"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={isSubmitting}
              error={errors.password?.message}
              {...register('password')}
            />
            {onNavigateToForgotPassword && (
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={onNavigateToForgotPassword}
                  disabled={isSubmitting}
                  className="text-xs font-medium text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        {onNavigateToRegister && (
          <footer className="mt-8 text-center text-xs text-zinc-400">
            Não possui uma conta?{' '}
            <button
              type="button"
              onClick={onNavigateToRegister}
              disabled={isSubmitting}
              className="font-medium text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
            >
              Criar conta
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
