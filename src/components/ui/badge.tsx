import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'new' | 'success' | 'warning';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
        {
          'bg-muted text-muted-foreground': variant === 'default',
          'bg-destructive text-white': variant === 'new',
          'bg-green-500 text-white': variant === 'success',
          'bg-yellow-500 text-white': variant === 'warning',
        },
        className
      )}
      {...props}
    />
  );
}
