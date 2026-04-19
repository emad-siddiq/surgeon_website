import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/cn';

const fieldBase =
  'w-full bg-white border border-border1 rounded-md px-4 py-3 text-[15px] leading-tight ' +
  'text-textPrimary placeholder:text-textMuted transition-[border-color,box-shadow,background-color] ' +
  'duration-[180ms] ease-breathe hover:border-border2 focus:outline-none focus:border-primary ' +
  'focus:shadow-[0_0_0_3px_rgba(13,110,253,0.2)] aria-[invalid=true]:border-red-600 ' +
  'disabled:opacity-60 disabled:bg-surface';

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
}

export function FieldLabel({ className, children, ...rest }: FieldLabelProps) {
  return (
    <label className={cn('block', className)} {...rest}>
      <span className="t-caption text-textSecondary">{children}</span>
    </label>
  );
}

export interface FieldErrorProps {
  id?: string;
  children?: ReactNode;
  className?: string;
}

export function FieldError({ id, children, className }: FieldErrorProps) {
  if (!children) return null;
  return (
    <span id={id} className={cn('t-caption mt-2 block text-red-600', className)} role="alert">
      {children}
    </span>
  );
}

type CommonProps = { label: ReactNode; error?: ReactNode; helperText?: ReactNode };

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, CommonProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, helperText, id, className, 'aria-describedby': ariaDescribedBy, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  return (
    <div>
      <label htmlFor={inputId} className="block">
        <span className="t-caption text-textSecondary">{label}</span>
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={
          [errorId, helperId, ariaDescribedBy].filter(Boolean).join(' ') || undefined
        }
        className={cn(fieldBase, 'mt-2', className)}
        {...rest}
      />
      {helperText ? (
        <span id={helperId} className="t-caption mt-2 block text-textMuted">
          {helperText}
        </span>
      ) : null}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, CommonProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, helperText, id, className, rows = 4, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  return (
    <div>
      <label htmlFor={inputId} className="block">
        <span className="t-caption text-textSecondary">{label}</span>
      </label>
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
        className={cn(fieldBase, 'mt-2 leading-[1.5]', className)}
        {...rest}
      />
      {helperText ? (
        <span id={helperId} className="t-caption mt-2 block text-textMuted">
          {helperText}
        </span>
      ) : null}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, CommonProps {
  options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, helperText, id, className, options, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  return (
    <div>
      <label htmlFor={inputId} className="block">
        <span className="t-caption text-textSecondary">{label}</span>
      </label>
      <select
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={errorId}
        className={cn(fieldBase, 'mt-2 pr-10', className)}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText ? (
        <span className="t-caption mt-2 block text-textMuted">{helperText}</span>
      ) : null}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
});
