import React from "react";
import { IoMdSearch } from "react-icons/io";

interface SearchInputProps {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  handleSearch,
  placeholder,
}) => (
  <div className="shadow bg-neutral-700 rounded-lg p-2 lg:p-4">
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder={placeholder}
      className="p-2 border border-neutral-900 rounded w-full bg-neutral-800 text-white relative"
    ></input>
    <IoMdSearch className="absolute top-7 right-4 lg:right-6 lg:top-9 w-5 h-5 text-white" />
  </div>
);

export default SearchInput;
