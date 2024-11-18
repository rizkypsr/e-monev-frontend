import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
  const [labelText, setLabelText] = useState(label);

  const displayFileNames = (files) => {
    if (files.length === 0) {
      return 'No File';
    }
    return `File terpilih: ${files.length}`;
  };

  const handleChange = (e) => {
    const filesUploaded = Array.from(e.target.files);
    handleFile(allowMultiple ? filesUploaded : filesUploaded[0]);

    const newFileNames = allowMultiple
      ? filesUploaded.map((file) => file.name)
      : [filesUploaded[0]?.name];
    setFileNames(newFileNames);
    setLabelText(displayFileNames(newFileNames));
  };

  const handleOnMouseEnter = () => {
    setLabelText('Klik untuk memilih file');
  };

  const handleOnMouseLeave = () => {
    setLabelText(fileNames.length > 0 ? displayFileNames(fileNames) : label);
  };

  return (
    <>
      <div className="bg-primary text-white px-3 py-2.5 rounded-lg whitespace-nowrap">
        <label
          htmlFor="file"
          className={twMerge(
            'cursor-pointer font-medium block',
            icon && 'flex items-center justify-center space-x-2'
          )}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          {fileNames.length > 0 && <div>{icon}</div>}
          <div>{labelText}</div>
          <input
            id="file"
            type="file"
            className="hidden"
            multiple={allowMultiple}
            {...register('file', {
              onChange: handleChange,
            })}
          />
        </label>
      </div>
      <p className="mt-2 text-xs text-red-600">{error}</p>
    </>
    // <div>
    //   <div className="whitespace-nowrap">
    //     <label
    //       htmlFor="file"
    //       className={`text-white cursor-pointer font-medium rounded-lg text-sm px-3 py-2.5 bg-primary ${
    //         icon ? 'flex items-center justify-center space-x-2 mb-2' : ''
    //       } ${className}`}
    //     >
    //       {fileNames.length > 0 ? icon : null}
    //
    //       <div className="text-xs">{label}</div>
    //       <input
    //         id="file"
    //         type="file"
    //         multiple={allowMultiple}
    //         onChange={handleChange}
    //         style={{ display: 'none' }}
    //         {...register('file', {
    //           onChange: (e) => handleChange(e),
    //         })}
    //       />
    //     </label>
    //     <div className="">
    //       {displayFileNames(fileNames)}
    //     </div>
    //   </div>
    //   <p className="mt-2 text-xs text-red-600">{error}</p>
    // </div>
  );
};

export default FileInput;
