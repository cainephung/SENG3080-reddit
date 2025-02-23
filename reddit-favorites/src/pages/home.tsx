/**
 * Home.tsx - Main page for searching Reddit posts.
 * Allows users to enter a subreddit name, fetch the top 10 "hot" posts,
 * and add posts to favorites.
 */
import { useState } from "react";
import axios from "axios";
import PostList from "../components/post";

interface Post {
  id: string;
  title: string;
  score: number;
  comments: string;
}

const Home = () => {
  const [subreddit, setSubreddit] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  /**
   * Fetches the top 10 "hot" posts from the entered subreddit using the Reddit API.
   * Updates the state with the retrieved posts or shows an error if the subreddit is invalid.
   */
  const fetchPosts = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    setPosts([]); // Clear previous posts while loading

    try {
      const response = await axios.get(
        `https://www.reddit.com/r/${subreddit}/hot.json?limit=10`
      );
      if (!response.data.data.children.length) {
        throw new Error("No posts found in this subreddit.");
      }

      const postList: Post[] = response.data.data.children.map(
        (item: { data: Post }) => ({
          id: item.data.id,
          title: item.data.title,
          score: item.data.score,
          comments: `https://www.reddit.com/r/${subreddit}/comments/${item.data.id}/`,
        })
      );
      setPosts(postList);
    } catch (error) {
      setError("Failed to fetch subreddit. It may not exist or is private.");
      console.error("Error fetching subreddit:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Reddit Favorites</h1>
      <input
        type="text"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
        placeholder="Enter subreddit"
      />
      <button onClick={fetchPosts} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
      {/* Show error message if search fails */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Display posts only if there are results */}
      {posts.length > 0 ? <PostList posts={posts} /> : null}
    </div>
  );
};

export default Home;
