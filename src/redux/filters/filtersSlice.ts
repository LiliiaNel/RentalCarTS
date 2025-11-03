import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {CarFilters} from '../../types';
import { fetchBrands } from "./filtersOperations";

interface FiltersState {
    selectedBrand: string;
    brands: string[];
    brandsLoading: boolean;
    brandsError: string | null;
    rentalPrice: string,
    minMileage: string,
    maxMileage: string,
    applied: CarFilters |null,
};

const initialState: FiltersState = {
  selectedBrand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
  applied: null,
  brands: [],
  brandsLoading: false,
  brandsError: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<string>) => { state.selectedBrand = action.payload; },
    setRentalPrice: (state, action: PayloadAction<string>) => { state.rentalPrice = action.payload; },
    setMinMileage: (state, action: PayloadAction<string>) => { state.minMileage = action.payload; },
    setMaxMileage: (state, action: PayloadAction<string>) => { state.maxMileage = action.payload; },
    resetFilters: (state) => {
      state.selectedBrand = "";
      state.rentalPrice = "";
      state.minMileage = "";
      state.maxMileage = "";
    },
    applyFilters: (state) => {
      state.applied = {
        selectedBrand: state.selectedBrand,
        rentalPrice: state.rentalPrice,
        minMileage: state.minMileage,
        maxMileage: state.maxMileage,
      };
    },
  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.brandsLoading = true;
        state.brandsError = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.brandsLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.brandsLoading = false;
        state.brandsError =
          (action.payload as string) || "Failed to load brands";
      });
   }
});

export const { setBrand, setRentalPrice, setMinMileage, setMaxMileage, resetFilters, applyFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;


