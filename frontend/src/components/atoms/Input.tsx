import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={props.name}>{label}</label>

        <input
          ref={ref}
          {...props}
          className="w-full py-2 px-4 bg-lightgray rounded-md focus:bg-white focus:outline-blue focus:invalid:border-red focus:invalid:outline-red"
        />
      </div>
    );
  },
);
