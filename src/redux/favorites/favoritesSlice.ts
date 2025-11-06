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
     toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = String(action.payload);
      const index = state.items.findIndex(i => i === id);
      if (index !== -1) {state.items.splice(index, 1);}
      else {state.items.push(id);}
      state.items = state.items.map(i => String(i));
    }
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (state:RootState) => state.favorites.items;

export default favoritesSlice.reducer;
