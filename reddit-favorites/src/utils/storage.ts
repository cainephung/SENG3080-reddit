/**
 * storage.ts - Utility functions for managing favorite Reddit posts.
 * Uses the Web Storage API (localStorage) to save, retrieve, and remove favorite post IDs.
 */

/**
 * Retrieves stored favorite post IDs from localStorage.
 * @returns {string[]} Array of post IDs.
 */
export const getStoredFavorites = (): string[] => {
  return JSON.parse(localStorage.getItem("favoritePosts") || "[]");
};

/**
 * Saves a post ID to localStorage.
 * Prevents duplicates by checking existing favorites.
 * @param {string} postId - The ID of the post to save.
 */
export const saveToFavorites = (postId: string): void => {
  const favorites = getStoredFavorites();
  if (!favorites.includes(postId)) {
    favorites.push(postId);
    localStorage.setItem("favoritePosts", JSON.stringify(favorites));
  }
};

/**
 * Removes a post ID from localStorage.
 * Updates the stored favorites list after removal.
 * @param {string} postId - The ID of the post to remove.
 */
export const removeFromFavorites = (postId: string): void => {
  const favorites = getStoredFavorites().filter((id) => id !== postId);
  localStorage.setItem("favoritePosts", JSON.stringify(favorites));
};
