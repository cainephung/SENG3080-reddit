import { useEffect, useState } from "react";
import axios from "axios";
import { getStoredFavorites, removeFromFavorites } from "../utils/storage";

interface Post {
  id: string;
  title: string;
  score: number;
  comments: string;
}

const FavoriteList = () => {
  const [favorites, setFavorites] = useState<string[]>(getStoredFavorites());
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchFavoritePosts = async () => {
      const postDetails = await Promise.all(
        favorites.map(async (postId) => {
          try {
            const response = await axios.get(
              `https://www.reddit.com/api/info.json?id=t3_${postId}`
            );
            const postData = response.data.data.children[0].data;
            return {
              id: postData.id,
              title: postData.title,
              score: postData.score,
              comments: `https://www.reddit.com${postData.comments}`,
            };
          } catch (error) {
            console.error("Error fetching post:", error);
            return null;
          }
        })
      );
      setPosts(postDetails.filter((p): p is Post => p !== null));
    };
    fetchFavoritePosts();
  }, [favorites]);

  const removePost = (postId: string) => {
    removeFromFavorites(postId);
    setFavorites(getStoredFavorites());
  };

  return (
    <div>
      <h2>Favorite Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> (Score: {post.score})
            <a href={post.comments} target="_blank" rel="noopener noreferrer">
              [Comments]
            </a>
            <button onClick={() => removePost(post.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
