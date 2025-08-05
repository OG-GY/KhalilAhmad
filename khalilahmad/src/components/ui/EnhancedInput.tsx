import React from 'react';
import { X } from 'lucide-react';

interface EnhancedInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  showClearButton?: boolean;
  variant?: "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const EnhancedInput: React.FC<EnhancedInputProps> = ({ 
  label, 
  leftIcon, 
  value, 
  onChange, 
  placeholder, 
  type = "text",
  showClearButton = false,
  variant: _variant,
  size: _size,
  className = "",
  ...rest
}) => {
  const handleClear = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full  border border-yellow-900/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all ${
            leftIcon ? 'pl-10' : ''
          } ${showClearButton ? 'pr-10' : ''}`}
          {...rest}
        />
        {showClearButton && value && (
          <button
            onClick={handleClear}
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export { EnhancedInput };
export type { EnhancedInputProps };