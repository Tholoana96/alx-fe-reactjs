import React, { useState } from "react";
import { searchUsers, fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState("");

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSelectedUser(null); // clear previous details

    try {
      const users = await searchUsers({ username, location, minRepos });
      setResults(users);
      if (users.length === 0) {
        setError("Looks like we cant find the user");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch detailed info for a selected user
  const handleUserClick = async (username) => {
    setLoadingUser(true);
    setUserError("");
    setSelectedUser(null);

    try {
      const userDetails = await fetchUserData(username);
      setSelectedUser(userDetails);
    } catch (err) {
      console.error(err);
      setUserError("Failed to fetch user details.");
    } finally {
      setLoadingUser(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="space-y-4 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-800">
          Search GitHub Users
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

      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {results.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4 shadow flex items-center gap-4 cursor-pointer"
            onClick={() => handleUserClick(user.login)}>
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-bold text-lg">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
                onClick={(e) => e.stopPropagation()} // prevent card click
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {loadingUser && (
        <p className="mt-6 text-center">Loading user details...</p>
      )}
      {userError && (
        <p className="mt-6 text-center text-red-500">{userError}</p>
      )}

      {selectedUser && (
        <div className="mt-6 p-4 border rounded shadow bg-white">
          <h2 className="text-2xl font-bold mb-2">
            {selectedUser.name || selectedUser.login}
          </h2>
          <img
            src={selectedUser.avatar_url}
            alt={selectedUser.login}
            className="w-32 h-32 rounded-full mb-4"
          />
          <p>{selectedUser.bio || "No bio available"}</p>
          <p>
            Followers: {selectedUser.followers} - Following:{" "}
            {selectedUser.following}
          </p>
          <p>Location: {selectedUser.location || "Unknown"}</p>
          <a
            href={selectedUser.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline">
            Visit GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
