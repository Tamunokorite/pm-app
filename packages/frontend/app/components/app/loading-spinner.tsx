import React from 'react';
import { cn } from "../../../lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
  speed?: 'slow' | 'normal' | 'fast';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  speed = 'normal'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    accent: 'border-accent'
  };

  const speedClasses = {
    slow: 'animate-spin-slow',
    normal: 'animate-spin',
    fast: 'animate-spin-fast'
  };

  return (
    <div
      className={cn(
        "inline-block rounded-full border-t-transparent animate-spin",
        sizeClasses[size],
        colorClasses[color],
        speedClasses[speed]
      )}
      role="status"
      aria-label="loading"
    />
  );
};

export default LoadingSpinner;
