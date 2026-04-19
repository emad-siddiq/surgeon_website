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
  'w-full bg-paper border border-border1 rounded-md px-4 py-[14px] text-[15px] leading-tight ' +
  'text-ink placeholder:text-ink3 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-breathe ' +
  'hover:border-border2 focus:outline-none focus:border-clay focus:shadow-[0_0_0_3px_rgba(178,85,58,0.20)] ' +
  'aria-[invalid=true]:border-clayDark disabled:opacity-60 disabled:bg-[#F5EEE6]';

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
}

export function FieldLabel({ className, children, ...rest }: FieldLabelProps) {
  return (
    <label className={cn('block', className)} {...rest}>
      <span className="t-caption text-ink2">{children}</span>
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
    <span id={id} className={cn('t-caption mt-2 block text-clayDark', className)} role="alert">
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
        <span className="t-caption text-ink2">{label}</span>
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
        <span id={helperId} className="t-caption mt-2 block text-ink3">
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
        <span className="t-caption text-ink2">{label}</span>
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
        <span id={helperId} className="t-caption mt-2 block text-ink3">
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
        <span className="t-caption text-ink2">{label}</span>
      </label>
      <select
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={errorId}
        className={cn(
          fieldBase,
          'mt-2 appearance-none bg-[url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2712%27%20height%3D%278%27%20viewBox%3D%270%200%2012%208%27%3E%3Cpath%20d%3D%27M1%201l5%205%205-5%27%20stroke%3D%27%23857A70%27%20fill%3D%27none%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%2F%3E%3C%2Fsvg%3E)] bg-[right_14px_center] bg-no-repeat pr-10',
          className,
        )}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText ? <span className="t-caption mt-2 block text-ink3">{helperText}</span> : null}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
});
