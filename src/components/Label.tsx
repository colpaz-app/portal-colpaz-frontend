import React from 'react';
import '../assets/styles/Label.css';

interface LabelProps {
    htmlFor?: string;
    required?: boolean;
    className?: string;
    children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, required = false, className = '', children }) => (
    <label htmlFor={htmlFor} className={`label ${className}`}>
        {children}
        {required && <span className="required">*</span>}
    </label>
);

export default Label;