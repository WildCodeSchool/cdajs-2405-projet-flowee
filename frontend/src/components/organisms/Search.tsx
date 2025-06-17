import SearchIcon from "@components/atoms/Icons/searchIcon";
import { useState } from "react";

interface SearchBarProps {
  setSearchFilter: (search: string) => void;
}

export default function SearchBar({ setSearchFilter }: SearchBarProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    setSearchFilter(newValue);
  };

  return (
    <div className="flex items-center justify-center flex-col  relative">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Looking for something?"
        className="w-full py-2 px-4 border border-theme-gray rounded-md focus:outline-theme-base hover:border-theme-darkGray "
      />
      <SearchIcon className="absolute right-3 text-black" />
    </div>
  );
}
