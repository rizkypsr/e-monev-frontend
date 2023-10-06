import React, { useState } from 'react';

const FileInput = ({ className, label, icon, handleFile, error, register }) => {
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    handleFile(fileUploaded);
    setFileName(fileUploaded?.name);

    register('file').onChange(fileUploaded);
  };

  return (
    <div>
      <div className="flex items-center space-x-3 whitespace-nowrap">
        <label
          htmlFor="file"
          className={`text-white cursor-pointer font-medium rounded-lg text-sm px-3 py-2.5 bg-primary ${
            icon ? 'flex items-center justify-center space-x-2' : ''
          } ${className} `}
        >
          {icon}
          <div>{label}</div>
          <input
            id="file"
            type="file"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </label>
        <div>{fileName || 'No File'}</div>
      </div>
      <p className="mt-2 text-xs text-red-600">{error}</p>
    </div>
  );
};

export default FileInput;
