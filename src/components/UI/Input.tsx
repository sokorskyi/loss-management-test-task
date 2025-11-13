import React from "react";
import type { ErrorOption } from "react-hook-form";

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  name: string;
  error?: ErrorOption;
  placeholder?: string;
}

const Input = ({ label, name, error, placeholder, ...props }: InputProps) => (
  <>
    <div className="flex mb-1">
      <label htmlFor={name} className="text-blue-950">
        {label}
      </label>
    </div>
    <input
      placeholder={placeholder || label}
      {...props}
      id={name}
      name={name}
      className={`w-full border px-4 py-2 rounded-lg focus:outline-none disabled:text-gray-400 disabled:pointer-events-none ${
        error ? "border-red-500" : "border-gray-300 focus:border-blue-950"
      }`}
    />
    <p className="text-red-500 text-left text-sm font-medium mt-2">{error?.message}</p>
    
  </>
);

export default Input;
