import React, { type PropsWithChildren } from "react";


const Button = ({ children, ...props }: React.ComponentProps<'button'> & PropsWithChildren ) => {
  return (
    <button
      {...props}
      className="rounded-full cursor-pointer bg-emerald-100 py-2 px-4 border border-transparent text-center text-sm text-black transition-all shadow-md hover:shadow-lg focus:bg-emerald-400 focus:shadow-none active:bg-emerald-400 hover:bg-emerald-400 active:shadow-none disabled:bg-grey-500 disabled:text-gray-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
      {children}
    </button>
  );
};

export default Button;
