/**
 * Favorites.tsx - Uses the FavoriteList component to show posts stored in localStorage.
 */
import FavoriteList from "../components/favorites";

const Favorites = () => {
  return (
    <div>
      <h1>Your Favorites</h1>
      <FavoriteList />
    </div>
  );
};

export default Favorites;
