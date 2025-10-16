import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectFilters = (state:RootState) => state.filters;

export const selectFilteredCars = createSelector(
  [(state: RootState) => state.cars.items, selectFilters],
  (cars, filters) => {
    return cars.filter(car => {
      const matchBrand = filters.brand ? car.brand === filters.brand : true;
      const matchPrice = filters.rentalPrice ? car.rentalPrice === filters.rentalPrice : true;
      const matchMileageFrom = filters.minMileage ? car.mileage >= Number(filters.minMileage) : true;
      const matchMileageTo = filters.maxMileage ? car.mileage <= Number(filters.maxMileage) : true;
      return matchBrand && matchPrice && matchMileageFrom && matchMileageTo;
    });
  }
);

export const selectAppliedFilters = (state:RootState) => state.filters.applied;
