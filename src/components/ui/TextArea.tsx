import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  error,
  fullWidth = false,
  className = '',
  id,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          block rounded-md shadow-sm 
          ${error ? 'border-red-500' : 'border-gray-300'}
          focus:border-blue-500 focus:ring-blue-500
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        rows={4}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;