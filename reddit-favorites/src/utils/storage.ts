// If nothing is stored, return an empty array
export const getStoredFavorites = (): string[] => {
  return JSON.parse(localStorage.getItem("favoritePosts") || "[]");
};

export const saveToFavorites = (postId: string): void => {
  const favorites = getStoredFavorites();
  if (!favorites.includes(postId)) {
    favorites.push(postId);
    localStorage.setItem("favoritePosts", JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (postId: string): void => {
  const favorites = getStoredFavorites().filter((id) => id !== postId);
  localStorage.setItem("favoritePosts", JSON.stringify(favorites));
};
