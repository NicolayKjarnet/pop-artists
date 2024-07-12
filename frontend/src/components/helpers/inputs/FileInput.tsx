import React, { ChangeEvent } from "react";

type FileInputProps = {
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FileInput: React.FC<FileInputProps> = ({ label, name, onChange }) => (
  <div className="form-group mb-3">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <input
      className="form-control"
      name={name}
      onChange={onChange}
      type="file"
    />
  </div>
);

export default FileInput;
