import React, { useState } from 'react';
import Label from './Label';
import '../assets/styles/Input.css';
import type {
  FieldProps,
  InputFieldProps,
  TextareaFieldProps,
  SelectFieldProps,
} from '../types/Input.types';

const Input: React.FC<FieldProps> = (props) => {
  const {
    label,
    error,
    required = false,
    type = 'text',
    className = '',
    wrapperClassName = '',
  } = props;

  const inputId = `input-${props.name}`;
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const renderField = () => {
    // TEXTAREA
    if (type === 'textarea') {
      const { name, value, onChange, ...rest } = props as TextareaFieldProps;
      return (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`input-field ${error ? 'input-error' : ''} ${className}`}
          {...rest}
        />
      );
    }

    // SELECT
    if (type === 'select') {
      const {
        name,
        value,
        onChange,
        options,
        placeholder,
        ...rest
      } = props as SelectFieldProps;

      return (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`input-field ${error ? 'input-error' : ''} ${className}`}
          {...rest}
        >
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    // PASSWORD
    if (type === 'password') {
      const {
        name,
        value,
        onChange,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        type: _omitType,
        ...rest
      } = props as InputFieldProps;

      return (
        <div className="input-password-wrapper">
          <input
            id={inputId}
            name={name}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            required={required}
            className={`input-field ${error ? 'input-error' : ''} ${className}`}
            {...rest}
          />
          <span
            className="input-password-toggle"
            onClick={togglePasswordVisibility}
            role="button"
            tabIndex={0}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') togglePasswordVisibility();
            }}
          >
            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
          </span>
        </div>
      );
    }

    // DEFAULT INPUT (text, email, date, checkbox, etc.)
    const {
      name,
      value,
      onChange,
      checked,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type: _omitType,
      ...rest
    } = props as InputFieldProps;

    return (
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        checked={(type === 'checkbox' || type === 'radio') ? checked : undefined}
        required={required}
        className={`input-field ${error ? 'input-error' : ''} ${className}`}
        {...rest}
      />
    );
  };

  return (
    <div className={`input-group input-${type} ${wrapperClassName}`}>
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}
      {renderField()}
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );

};

export default Input;