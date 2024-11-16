import React, { useState } from 'react';

const FileInput = ({
  className,
  label,
  icon,
  handleFile,
  error,
  register,
  allowMultiple = false,
}) => {
  const [fileNames, setFileNames] = useState([]);

  const handleChange = (e) => {
    const filesUploaded = Array.from(e.target.files);
    handleFile(allowMultiple ? filesUploaded : filesUploaded[0]);

    setFileNames(
      allowMultiple
        ? filesUploaded.map((file) => file.name)
        : [filesUploaded[0]?.name]
    );
  };

  const displayFileNames = (files) => {
    if (files.length === 0) {
      return 'No File';
    }
    return `${files.length} file berhasil dipilih`;
  };

  return (
    <div>
      <div className="flex items-center space-x-3 whitespace-nowrap">
        <label
          htmlFor="file"
          className={`text-white cursor-pointer font-medium rounded-lg text-sm px-3 py-2.5 bg-primary ${
            icon ? 'flex items-center justify-center space-x-2' : ''
          } ${className}`}
        >
          {fileNames.length > 0 ? icon : null}

          <div>{label}</div>
          <input
            id="file"
            type="file"
            multiple={allowMultiple}
            onChange={handleChange}
            style={{ display: 'none' }}
            {...register('file', {
              onChange: (e) => handleChange(e),
            })}
          />
        </label>
        <div className="font-semibold underline">
          {displayFileNames(fileNames)}
        </div>
      </div>
      <p className="mt-2 text-xs text-red-600">{error}</p>
    </div>
  );
};

export default FileInput;
