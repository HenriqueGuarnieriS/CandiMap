import React from "react";

interface SearchInputProps {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  handleSearch,
}) => (
  <div className="shadow bg-neutral-700 rounded-lg p-4">
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Buscar partido"
      className="p-2 border border-neutral-900 rounded w-full bg-neutral-800 text-white"
    />
  </div>
);

export default SearchInput;
