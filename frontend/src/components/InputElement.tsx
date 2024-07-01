import React from "react";
import { InputElementProps } from "../utils/interfaces";

export const InputElement: React.FC<InputElementProps> = (props) => {
  const { name, label, inputType, placeholder, onChange, error } = props;
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <label className="block font-semibold" htmlFor={name}>
          {label}
        </label>
        <input
          type={inputType}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          className="border ml-2 mb-2 p-1 rounded border-black"
        />
      </div>
      <div className="flex justify-center">
        {error && <span className="text-red-500">{error}</span>}
      </div>
    </div>
  );
};
