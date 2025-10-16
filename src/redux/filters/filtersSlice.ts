import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {CarFilters} from '../../types';

interface FiltersState {
    brand: string,
    rentalPrice: string,
    minMileage: string,
    maxMileage: string,
    applied: CarFilters |null,
};

const initialState: FiltersState = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
  applied: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<string>) => { state.brand = action.payload; },
    setRentalPrice: (state, action: PayloadAction<string>) => { state.rentalPrice = action.payload; },
    setMinMileage: (state, action: PayloadAction<string>) => { state.minMileage = action.payload; },
    setMaxMileage: (state, action: PayloadAction<string>) => { state.maxMileage = action.payload; },
    resetFilters: (state) => {
      state.brand = "";
      state.rentalPrice = "";
      state.minMileage = "";
      state.maxMileage = "";
    },
    applyFilters: (state) => {
      state.applied = {
        brand: state.brand,
        rentalPrice: state.rentalPrice,
        minMileage: state.minMileage,
        maxMileage: state.maxMileage,
      };
    },
  },
});

export const { setBrand, setRentalPrice, setMinMileage, setMaxMileage, resetFilters, applyFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;


