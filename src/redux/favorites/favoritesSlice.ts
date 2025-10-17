import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FavoritesState {
  items: string[],
}

const initialState:FavoritesState = {
  items: [], 
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state,  action: PayloadAction<string>) => {
      const carId = action.payload;
      if (state.items.includes(carId)) {
        state.items = state.items.filter(id => id !== carId);
      } else {
        state.items.push(carId);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (state:RootState) => state.favorites.items;

export default favoritesSlice.reducer;
