import { ChangeEvent, FC } from "react";

import "./FormInput.css";

type FormInputProps<T> = {
  label: string;
  inputType: "text" | "number" | "email";
  placeholder: string;
  name: T;
  value: string | null;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FormInput = <T extends string>({
  label,
  inputType,
  placeholder,
  name,
  value,
  onChangeHandler,
}: FormInputProps<T>) => {
  return (
    <div className="form-input">
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <input
        onChange={onChangeHandler}
        id={name}
        name={name}
        type={inputType}
        value={value ?? ""}
        placeholder={placeholder}
      />
    </div>
  );
};
export default FormInput;
