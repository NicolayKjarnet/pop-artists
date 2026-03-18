import React, { ChangeEvent } from "react";

type SearchInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <div className="form-group">
    <input
      className="form-control"
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Search..."}
    />
  </div>
);

export default SearchInput;
