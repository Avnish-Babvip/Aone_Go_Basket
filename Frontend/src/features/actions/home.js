import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const getHomeData = createAsyncThunk(
  "/api/customer/home",
  async (_, { rejectWithValue }) => {
    try {
      const link = `/customer/home`;
      const { data } = await instance.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
