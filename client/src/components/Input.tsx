import React from 'react';

interface InputProp {
  placeholder: string;
  value?: any;
  type: 'text' | 'password' | 'email';
  reference: any;
}

export function Input({ placeholder, value, type, reference }: InputProp) {
  return (
    <div className="border-black">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        ref={reference}
        className="px-4 py-2 text-gray-600 bg-transparent w-full border-b-2 focus:outline-none focus:border-black"
      />
    </div>
  );
}
