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
