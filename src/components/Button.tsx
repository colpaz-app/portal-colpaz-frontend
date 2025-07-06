import type { ReactNode } from 'react';
import '../assets/styles/Button.css';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'link' | 'light' | 'success' | 'warning' | 'info' | 'accessibility';
  size?: 'icon' | 'padding-0' | 'medium';
  disabled?: boolean;
  title?: string;
}

const Button = ({
  children,
  type = 'button',
  onClick,
  className = '',
  variant = 'primary',
  size,
  disabled = false,
  title = '',
}: ButtonProps) => {

  const sizeClass = size ? `btn-${size}` : '';

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`custom-button btn-${variant} ${sizeClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;