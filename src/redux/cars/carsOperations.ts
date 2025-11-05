import axios from "axios";
import type { Car, CarsResponse, CarFilters } from "../../types";
import { createAppAsyncThunk } from "../createAppAsyncThunk";


export const fetchCars = createAppAsyncThunk<CarsResponse, CarFilters>(
  "cars/fetchCars",
  async (filters, { rejectWithValue }) => {
    try {
      const params: { page?: string } & CarFilters & { limit: number } = { limit: 10, ...filters };
       if (!params.page) params.page = "1";
      const { data } = await axios.get<CarsResponse>("https://car-rental-api.goit.global/cars", { params });
            console.log('Fetched cars data:', data);
      return data;

    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch cars");
    }
  }
);

// fetchCarById thunk:
// - Returns a single Car object (first generic: Car)
// - Expects the ID of the car as a string argument (second generic: string)
export const fetchCarById = createAppAsyncThunk<Car, string>(
  "cars/fetchCarById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<Car>(`https://car-rental-api.goit.global/cars/${id}`);
      return response.data;

    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch car details");
    }
  }
);

