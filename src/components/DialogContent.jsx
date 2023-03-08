import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const DialogContent = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="bg-gray-900 fixed inset-0 opacity-40" />
      <DialogPrimitive.Content
        {...props}
        ref={forwardedRef}
        style={{ left: "55%" }}
        className={`bg-white rounded-md fixed top-1/2 -translate-x-1/2 -translate-y-1/2 p-9 max-w-3xl text-center ${props.className}`}>
        <div className="flex justify-between">
          <DialogPrimitive.Title className="font-semibold text-xl leading-8">
            {props.title}
          </DialogPrimitive.Title>
          {props.closeButton && (
            <DialogPrimitive.Close
              aria-label="Close"
              className="font-semibold leading-6">
              Tutup
            </DialogPrimitive.Close>
          )}
        </div>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
