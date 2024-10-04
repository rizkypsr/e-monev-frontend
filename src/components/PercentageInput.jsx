import React from 'react';
import { useController } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { twMerge } from 'tailwind-merge';

import Label from './Label';

const PercentageInput = React.forwardRef(
  ({ className, control, name, label, placeholder, defaultValue }, ref) => {
    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue,
    });

    return (
      <div>
        <Label className="mb-2">{label}</Label>
        <NumericFormat
          className={twMerge(
            'text-gray-900 border border-dark-gray bg-white text-sm rounded-lg focus:ring-0 w-full focus:outline-none focus:border-dark-gray px-4 py-2.5',
            className
          )}
          format="##%"
          thousandSeparator=","
          prefix="% "
          allowNegative={false}
          getInputRef={ref || field.ref}
          onValueChange={(values) => {
            const numericValue = parseFloat(
              values.value.replace(/[^\d.]/g, ''),
              10
            );
            field.onChange(numericValue);
          }}
          value={field.value}
          placeholder={placeholder}
        />
        {error && <p className="mt-2 text-xs text-red-600">{error.message}</p>}
      </div>
    );
  }
);

export default PercentageInput;
