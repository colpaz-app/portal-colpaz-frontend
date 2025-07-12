export type InputTypes =
  | 'text' | 'password' | 'email' | 'number'
  | 'checkbox' | 'radio' | 'date' | 'file'
  | 'tel' | 'url' | 'search' | 'color'
  | 'time' | 'datetime-local';

export interface Option {
  label: string;
  value: string | number;
}

interface CommonProps {
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
}

// Props para input
export interface InputFieldProps extends CommonProps, React.InputHTMLAttributes<HTMLInputElement> {
  type?: InputTypes;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Props para textarea
export interface TextareaFieldProps extends CommonProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  type: 'textarea';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

// Props para select
export interface SelectFieldProps extends CommonProps, React.SelectHTMLAttributes<HTMLSelectElement> {
  type: 'select';
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

// Tipo combinado
export type FieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;