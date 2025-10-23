// Let's define a Redux "slice" to manage our favorite articles.
// Think of this as a dedicated module for all logic related to favorites.

import { createSlice } from "@reduxjs/toolkit";

// `initialState` is the starting state for this slice.
// We begin with `favoriteArticles` as an empty array.
const initialState = {
  favoriteArticles: [],
};

/**
 * `createSlice` from Redux Toolkit simplifies state management.
 * It automatically generates action creators and reducers for us based on the
 * functions we provide in the `reducers` object.
 */
const favoritesSlice = createSlice({
  name: "favorites", // A unique name for this slice.
  initialState,
  // `reducers` is where we define all the functions that can modify this slice's state.
  reducers: {
    /**
     * The `toggleFavorite` reducer handles adding and removing articles from the favorites list.
     * Redux Toolkit uses Immer internally, which allows us to write "mutating" logic
     * in reducers, but it safely translates it into an immutable update.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action, containing the payload.
     */
    toggleFavorite: (state, action) => {
      // `action.payload` contains the data we send when dispatching this action (in this case, the article object).
      const article = action.payload;
      
      // We check if the article already exists in the favorites list by its ID.
      const existingIndex = state.favoriteArticles.findIndex(
        (item) => item.idArticle === article.idArticle
      );

      // If `existingIndex` is 0 or greater, the article is already a favorite.
      if (existingIndex >= 0) {
        // So, we remove it from the array.
        state.favoriteArticles.splice(existingIndex, 1);
      } else {
        // If it's not found, it's a new favorite. We add it to the array.
        state.favoriteArticles.push(article);
      }
    },
  },
});

// We export the `toggleFavorite` action so it can be dispatched from our components (e.g., ArticleDetailScreen).
export const { toggleFavorite } = favoritesSlice.actions;

// We also export the reducer itself so it can be combined in our main Redux store.
export default favoritesSlice.reducer;
