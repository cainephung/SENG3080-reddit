/**
 * Post.tsx - Displays a list of Reddit posts.
 * Allows users to favorite posts and saves post IDs in localStorage.
 */
import { useState } from "react";
import { saveToFavorites, getStoredFavorites } from "../utils/storage";

interface Post {
  id: string;
  title: string;
  score: number;
  comments: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [favorites, setFavorites] = useState<string[]>(getStoredFavorites());

  /**
   * Handles favoriting a post.
   * Saves the post ID to localStorage and updates the state.
   */
  const handleFavorite = (postId: string) => {
    saveToFavorites(postId);
    setFavorites(getStoredFavorites()); // Update state to reflect changes
  };

  return (
    <ul>
      {posts.map((post) => {
        const isFavorited = favorites.includes(post.id);
        return (
          <li key={post.id}>
            <strong>{post.title}</strong> (Score: {post.score})
            <a href={post.comments} target="_blank" rel="noopener noreferrer">
              [Comments]
            </a>
            <button
              onClick={() => handleFavorite(post.id)}
              disabled={isFavorited}
            >
              {isFavorited ? "Favorited" : "Favorite"}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
