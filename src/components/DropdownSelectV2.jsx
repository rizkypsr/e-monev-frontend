import React from 'react';
import { twMerge } from 'tailwind-merge';
import * as SelectPrimitive from '@radix-ui/react-select';
import {
  CheckBadgeIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/solid';

const Dropdown = SelectPrimitive.Root;

const DropdownGroup = SelectPrimitive.Group;

const DropdownValue = SelectPrimitive.Value;

const DropdownTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={twMerge(
        'flex h-10 items-center justify-between rounded-lg bg-white px-3 py-2 text-sm placeholder:text-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 shadow space-x-3',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);

DropdownTrigger.displayName = SelectPrimitive.Trigger.displayName;

const DropdownScrollUpButton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={twMerge(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronUpDownIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  )
);
DropdownScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const DropdownScrollDownButton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={twMerge(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  )
);
DropdownScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const DropdownContent = React.forwardRef(
  ({ className, children, position = 'popper', ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={twMerge(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        {...props}
      >
        <DropdownScrollUpButton />
        <SelectPrimitive.Viewport
          className={twMerge(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <DropdownScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
DropdownContent.displayName = SelectPrimitive.Content.displayName;

const DropdownLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={twMerge('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
DropdownLabel.displayName = SelectPrimitive.Label.displayName;

const DropdownItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={twMerge(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckBadgeIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
DropdownItem.displayName = SelectPrimitive.Item.displayName;

const DropdownSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={twMerge('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
DropdownSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Dropdown,
  DropdownGroup,
  DropdownValue,
  DropdownTrigger,
  DropdownContent,
  DropdownLabel,
  DropdownItem,
  DropdownSeparator,
  DropdownScrollUpButton,
  DropdownScrollDownButton,
};
