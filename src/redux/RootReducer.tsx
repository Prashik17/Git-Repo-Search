// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice'; 

export const rootReducer = combineReducers({
  favorites: favoritesReducer,
});
