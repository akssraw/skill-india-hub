import React from 'react';

/**
 * Button — multi-variant button with consistent design.
 *
 * Variants: primary | secondary | outline | ghost | accent
 * Sizes:    sm | md | lg
 */

const variantClasses = {
  primary: [
    'bg-primary-500 text-white',
    'hover:bg-primary-600 hover:shadow-glow-green',
    'active:bg-primary-700',
    'focus-visible:ring-primary-400',
  ].join(' '),

  secondary: [
    'bg-secondary-600 text-white',
    'hover:bg-secondary-700 hover:shadow-glow-indigo',
    'active:bg-secondary-800',
    'focus-visible:ring-secondary-400',
  ].join(' '),

  outline: [
    'border-2 border-primary-500 text-primary-600 bg-transparent',
    'hover:bg-primary-50 hover:border-primary-600',
    'active:bg-primary-100',
    'focus-visible:ring-primary-400',
  ].join(' '),

  ghost: [
    'text-slate-700 bg-transparent',
    'hover:bg-slate-100 hover:text-slate-900',
    'active:bg-slate-200',
    'focus-visible:ring-slate-400',
  ].join(' '),

  accent: [
    'bg-accent-500 text-white',
    'hover:bg-accent-600',
    'active:bg-accent-700',
    'focus-visible:ring-accent-400',
  ].join(' '),
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

const Button = React.forwardRef(({
  children,
  variant  = 'primary',
  size     = 'md',
  icon,
  iconRight,
  className = '',
  disabled  = false,
  loading   = false,
  as: Tag   = 'button',
  ...props
}, ref) => {
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-semibold rounded-xl',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'select-none',
  ].join(' ');

  return (
    <Tag
      ref={ref}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && (
        <span className="shrink-0">{iconRight}</span>
      )}
    </Tag>
  );
});

Button.displayName = 'Button';

export default Button;
