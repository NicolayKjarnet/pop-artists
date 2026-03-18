import React, { ChangeEvent } from "react";

type TextInputProps = {
  label: string;
  name: string;
  value: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
}) => (
  <div className="form-group mb-3">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <input
      className="form-control"
      name={name}
      value={value}
      onChange={onChange}
      type="text"
    />
  </div>
);

export default TextInput;
