import React from 'react';

interface TextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  id?: string;
  name?: string;
  label?: string;
  rows?: number;
  disabled?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  id,
  name,
  label,
  rows = 4,
  disabled = false,
}) => {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none';
  const disabledClasses = disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : '';
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!disabled) {
      onChange?.(e.target.value);
    }
  };

  const textareaElement = (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`${baseClasses} ${disabledClasses} ${className}`}
      rows={rows}
    />
  );

  if (label) {
    return (
      <div>
        <label 
          htmlFor={id} 
          className={`block text-sm font-medium mb-2 ${
            disabled ? 'text-gray-400' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
        {textareaElement}
      </div>
    );
  }

  return textareaElement;
};