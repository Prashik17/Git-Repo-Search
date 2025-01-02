// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice'; // Adjust this import path based on your structure

export const rootReducer = combineReducers({
  favorites: favoritesReducer,
  // Add other reducers here if necessary
});
