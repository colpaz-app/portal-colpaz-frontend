import type { ReactNode } from 'react';
import '../assets/styles/Button.css';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'link' | 'light' | 'success' | 'warning' | 'info';
  disabled?: boolean;
  title?: string;
}

const Button = ({
  children,
  type = 'button',
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  title = '',
}: ButtonProps) => {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`custom-button btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;