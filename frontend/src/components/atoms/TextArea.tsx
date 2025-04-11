import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={props.name}>{label}</label>

        <textarea
          ref={ref}
          {...props}
          className="w-full border rounded px-3 py-2 focus:outline-blue focus:invalid:border-red focus:invalid:outline-red"
        />
      </div>
    );
  }
);
