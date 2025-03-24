import { useState } from "react";
import AccountsWrapper from "../AccountsWrapper";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col items-center w-full max-w-[500px]">
      <input
        type="text"
        placeholder="Search accounts..."
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <AccountsWrapper query={query} />
    </div>
  );
}
