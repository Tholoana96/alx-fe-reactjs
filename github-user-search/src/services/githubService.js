import axios from "axios";

const BASE_URL = "https://api.github.com/search/users";

export const searchUsers = async ({ username, location, minRepos }) => {
  let query = "";

  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const response = await axios.get(
      `${BASE_URL}?q=${encodeURIComponent(query)}`,
      {
        headers,
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
