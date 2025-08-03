import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ username, location, minRepos });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Advanced GitHub User Search
      </h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      <input
        type="number"
        placeholder="Min Repositories"
        value={minRepos}
        onChange={(e) => setMinRepos(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
