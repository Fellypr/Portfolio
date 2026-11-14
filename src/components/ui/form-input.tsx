import React, { forwardRef, useId } from 'react';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, id, className = '', disabled, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = error
      ? errorId
      : helperText
        ? helperId
        : undefined;

    return (
      <div className="flex w-full flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={`text-sm font-medium ${
            disabled ? 'text-zinc-500 cursor-not-allowed' : 'text-zinc-200'
          }`}
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={`w-full rounded-lg border bg-zinc-900/80 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors duration-150 focus:ring-2 focus:ring-offset-1 focus:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 ${
              error
                ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                : 'border-zinc-700/80 hover:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500/20'
            } ${className}`}
            {...rest}
          />
        </div>
        {error ? (
          <p id={errorId} role="alert" className="text-xs text-red-400">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-zinc-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
