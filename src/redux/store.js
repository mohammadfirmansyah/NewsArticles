// This file is where we configure and create our Redux store.
// The store is the single source of truth for our application's global state.

import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

/**
 * We use `configureStore` from Redux Toolkit to create the store.
 * This function simplifies the setup process and includes helpful defaults,
 * such as setting up the Redux DevTools Extension.
 */
const store = configureStore({
  // The `reducer` parameter is an object where each key corresponds to a slice of state,
  // and its value is the reducer function that manages that slice.
  reducer: {
    // Here, we're telling Redux that the `favorites` slice of our state
    // will be managed by the `favoritesReducer` we imported from `favoritesSlice.js`.
    favorites: favoritesReducer,
  },
});

// We export the configured store so it can be provided to our React application
// in the root component (App.js).
export default store;
