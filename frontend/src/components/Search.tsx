import { useState } from "react";
import SearchIcon from "./Icons/searchIcon";

interface SearchBarProps {
  setSearchFilter: (search: string) => void;
}

export default function SearchBar({ setSearchFilter }: SearchBarProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const sendData = () => {
    setSearchFilter(search);
  };

  return (
    <div className="flex items-center justify-center flex-col mb-3 relative">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        onKeyUp={sendData}
        placeholder="Looking for something?"
        className="w-full py-2 px-4 border border-gray-300 rounded-md"
      />
      <SearchIcon className="absolute right-3" />
    </div>
  );
}
