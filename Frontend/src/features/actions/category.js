import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const getAllCategoriesWithSubCategories = createAsyncThunk(
  "/api/customer/categoryswq",
  async (_, { rejectWithValue }) => {
    try {
      const link = `/customer/categories`;
      const { data } = await instance.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
