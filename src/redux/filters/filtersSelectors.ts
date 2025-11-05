import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectFilters = (state:RootState) => state.filters;

export const selectFilteredCars = createSelector(
  [(state: RootState) => state.cars.items, selectFilters],
  (cars, filters) => {
    return cars.filter(car => {
      const matchBrand = filters.selectedBrand ? car.brand === filters.selectedBrand : true;
      const matchPrice = filters.rentalPrice ? car.rentalPrice === filters.rentalPrice : true;
      const matchMileageFrom = filters.minMileage ? car.mileage >= Number(filters.minMileage) : true;
      const matchMileageTo = filters.maxMileage ? car.mileage <= Number(filters.maxMileage) : true;
      return matchBrand && matchPrice && matchMileageFrom && matchMileageTo;
    });
  }
);

export const selectAppliedFilters = (state:RootState) => state.filters.applied;

export const selectBrands = (state: RootState) => state.filters.brands;

export const selectBrandsLoading = (state: RootState) =>
  state.filters.brandsLoading;

export const selectBrandsError = (state: RootState) =>
  state.filters.brandsError;
