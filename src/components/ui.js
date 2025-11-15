import { forwardRef, Fragment } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as TabsPrimitive from '@radix-ui/react-tabs'

export const Button = ({ className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    {...props}
  />
)

export const Input = forwardRef(({ className = '', ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
    {...props}
  />
))
Input.displayName = 'Input'

export const Label = ({ className = '', ...props }) => (
  <label className={`text-sm font-medium text-gray-700 ${className}`} {...props} />
)

export const Textarea = forwardRef(({ className = '', ...props }, ref) => (
  <textarea
    ref={ref}
    className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

// Dialog
export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogClose = DialogPrimitive.Close

export const DialogContent = forwardRef(({ className = '', children, ...props }, ref) => (
  <Fragment>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />
    <DialogPrimitive.Content
      ref={ref}
      className={`fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </Fragment>
))
DialogContent.displayName = 'DialogContent'

export const DialogHeader = ({ className = '', ...props }) => (
  <div className={`mb-4 space-y-1 ${className}`} {...props} />
)

export const DialogTitle = ({ className = '', ...props }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />
)

export const DialogDescription = ({ className = '', ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props} />
)

// Tabs
export const Tabs = TabsPrimitive.Root
export const TabsList = ({ className = '', ...props }) => (
  <TabsPrimitive.List className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600 ${className}`} {...props} />
)
export const TabsTrigger = ({ className = '', ...props }) => (
  <TabsPrimitive.Trigger className={`inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1.5 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow ${className}`} {...props} />
)
export const TabsContent = ({ className = '', ...props }) => (
  <TabsPrimitive.Content className={`mt-4 ${className}`} {...props} />
)
