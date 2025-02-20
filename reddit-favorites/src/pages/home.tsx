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

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.reddit.com/r/${subreddit}/hot.json?limit=10`
      );
      const postList: Post[] = response.data.data.children.map(
        (item: { data: Post }) => ({
          id: item.data.id,
          title: item.data.title,
          score: item.data.score,
          comments: item.data.comments,
        })
      );
      setPosts(postList);
    } catch (error) {
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

      <PostList posts={posts} />
    </div>
  );
};

export default Home;
