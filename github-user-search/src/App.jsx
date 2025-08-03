import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { searchUsers } from "./services/githubService";

function App() {
  const [users, setUsers] = useState([]);

  const handleSearch = async (params) => {
    const results = await searchUsers(params);
    setUsers(results);
  };

  <h1 className="text-3xl font-bold text-green-600">Tailwind is working!</h1>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <SearchBar onSearch={handleSearch} />

      <div className="mt-6 max-w-4xl mx-auto space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar_url}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold">
                    {user.login}
                  </a>
                  <p className="text-sm text-gray-600">
                    GitHub Score: {user.score.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
