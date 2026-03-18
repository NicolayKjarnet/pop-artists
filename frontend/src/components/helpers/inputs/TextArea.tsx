import React, { ChangeEvent } from "react";

type TextAreaProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
}) => (
  <div className="form-group mb-3">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <textarea
      className="form-control"
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
    />
  </div>
);

export default TextArea;
