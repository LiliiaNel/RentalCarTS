import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Car } from "../../types";

export const selectCars = (state:RootState):Car[] => state.cars?.items ?? [];

export const selectSelectedCar = (state:RootState): Car|null => state.cars.selectedCar;

export const selectCarsLoading = (state:RootState):boolean => state.cars.isLoading;

export const selectCarsError = (state:RootState):string | null => state.cars.error;

export const selectCurrentPage = (state:RootState):number => state.cars.page;

export const selectTotalPages = (state:RootState):number => state.cars.totalPages;

export const selectTotalCars = (state:RootState):number => state.cars.totalCars;

export const selectHasNextPage = (state:RootState):boolean => state.cars.page < state.cars.totalPages;
