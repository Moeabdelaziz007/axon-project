import clsx from 'clsx';
import React from 'react';

// Define the props for the Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

/**
 * A reusable Button component with variants and sizes, built with design tokens.
 * This is a core UI component for the application.
 * @param {ButtonProps} props - Component properties.
 * @returns {JSX.Element} The rendered button element.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
  { variant = 'primary', size = 'md', children, className = '', ...props },
  ref
) => {
  // Maps variants to their corresponding CSS classes from our design system
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100 focus:ring-slate-500',
    success: 'bg-success hover:bg-success/90 text-white focus:ring-success',
    danger: 'bg-danger hover:bg-danger/90 text-white focus:ring-danger',
  };

  // Maps sizes to their corresponding CSS classes
  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      ref={ref}
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
