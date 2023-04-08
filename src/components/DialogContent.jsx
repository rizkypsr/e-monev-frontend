import PropTypes from 'prop-types';
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { PlusIcon } from '@heroicons/react/24/solid';
import Button from './Button';

export const DialogContent = React.forwardRef(
  (
    { children, className, title, addButton, closeButton, onCreateClick },
    forwardedRef
  ) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="bg-gray-900 fixed z-40 inset-0 opacity-40" />
      <DialogPrimitive.Content
        ref={forwardedRef}
        className={`bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 z-50 -translate-y-1/2 p-9 max-w-3xl text-center w-2/6 ${className}`}
      >
        <div className="flex justify-between">
          <DialogPrimitive.Title className="font-semibold text-xl leading-8">
            {title}
          </DialogPrimitive.Title>
          {addButton && (
            <Button
              background="bg-primary"
              textColor="text-white"
              icon={<PlusIcon className="w-4 h-4" />}
              onClick={onCreateClick}
            />
          )}
          {closeButton && (
            <DialogPrimitive.Close
              aria-label="Close"
              className="font-semibold leading-6"
            >
              Tutup
            </DialogPrimitive.Close>
          )}
        </div>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);

DialogContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  addButton: PropTypes.bool,
  closeButton: PropTypes.bool,
  onCreateClick: PropTypes.func,
  title: PropTypes.string,
};

DialogContent.defaultProps = {
  className: null,
  title: null,
  addButton: false,
  closeButton: false,
  onCreateClick: null,
};

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
