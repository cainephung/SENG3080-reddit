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

  /**
   * Fetches the top 10 "hot" posts from the entered subreddit using the Reddit API.
   * Updates the state with the retrieved posts.
   */
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.reddit.com/r/${subreddit}/hot.json?limit=10`
      );

      const postList: Post[] = response.data.data.children
        .slice(0, 10) // NEW: Explicitly limits to 10 posts
        .map((item: { data: Post }) => ({
          id: item.data.id,
          title: item.data.title,
          score: item.data.score,
          comments: `https://www.reddit.com/r/${subreddit}/comments/${item.data.id}/`,
        }));
      setPosts(postList);
    } catch (error) {
      console.error("Error fetching subreddit:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Reddit Favorites</h1>

      {/* Search bar always visible */}
      <input
        type="text"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
        placeholder="Enter subreddit"
      />
      <button onClick={fetchPosts} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>

      {/* Display posts */}
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
