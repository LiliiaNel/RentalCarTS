import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById} from "./carsOperations";
import {Car} from '../../types';

interface CarsState {
  items: Car[],
  selectedCar: Car | null, 
  isLoading: boolean,
  error: string | null,
  page: number,
  totalPages: number,
  totalCars: number,
  limit: number,
};

const initialState: CarsState = {
  items: [],
  selectedCar: null, 
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 0,
  totalCars: 0,
  limit: 10,
}

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        const { cars, page, totalPages, totalCars } = action.payload;
        const pageNumber = Number(page);

        if (pageNumber > 1) {
          state.items = [...state.items, ...cars];
        } else {
          state.items = cars;
        }

        state.page = pageNumber;
        state.totalPages = totalPages;
        state.totalCars = totalCars;
        state.isLoading = false;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Unknown error";
      })
       .addCase(fetchCarById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.selectedCar = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })
  },
});


export default carsSlice.reducer;
