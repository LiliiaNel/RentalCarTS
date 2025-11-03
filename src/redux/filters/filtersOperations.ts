import { createAppAsyncThunk } from "../createAppAsyncThunk";
import axios from "axios";

export const fetchBrands = createAppAsyncThunk<string[], void>(
  "filters/fetchBrands",
  async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<string[]>("https://car-rental-api.goit.global/brands");
    return data; 
  } catch (error) {
    const message = axios.isAxiosError(error) && error.message
    ? error.message
    : "Failed to fetch brands";
  return rejectWithValue(message);
  }
});
