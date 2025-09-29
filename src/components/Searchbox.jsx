import React, { useState } from "react";

const Searchbox = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(googleUrl, "_blank");
    }
  };

  return (
    <div className="flex w-full sm:w-[65vh] px-4 items-center justify-center">
      <form
        onSubmit={handleSearch}
        className="flex w-full text-center bg-gray-300 rounded-md overflow-hidden"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="flex-grow p-3 text-center border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 hover:bg-blue-600 transition-colors"
        >
          بحث
        </button>
      </form>
    </div>
  );
};

export default Searchbox;
