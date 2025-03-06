import React, { ChangeEvent, useState } from 'react';

interface FileInputProps {
  label?: string;
  error?: string;
  onChange: (file: File | null) => void;
  accept?: string;
  previewUrl?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  error,
  onChange,
  accept = 'image/*',
  previewUrl
}) => {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const inputId = `file-input-${Math.random().toString(36).substring(2, 9)}`;
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    } else {
      setPreview(null);
      onChange(null);
    }
  };
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="flex items-center space-x-4">
        <label className="cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Seleccionar archivo
          <input
            id={inputId}
            type="file"
            className="sr-only"
            accept={accept}
            onChange={handleChange}
          />
        </label>
        
        {preview && (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="h-16 w-16 object-cover rounded-md"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs"
              onClick={() => {
                setPreview(null);
                onChange(null);
              }}
            >
              ×
            </button>
          </div>
        )}
        
        {!preview && previewUrl && (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Current"
              className="h-16 w-16 object-cover rounded-md"
            />
          </div>
        )}
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileInput;