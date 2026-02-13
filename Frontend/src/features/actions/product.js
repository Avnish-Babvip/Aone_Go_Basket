import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const getAllProducts = createAsyncThunk(
  "/api/customer/products",
  async ({ search, page, per_page, sort }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      params.append("page", page || 1);
      params.append("per_page", per_page || 6);

      if (search) params.append("search", search);
      if (sort) params.append("sort", sort);

      const link = `/customer/products?${params.toString()}`;

      const { data } = await instance.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
