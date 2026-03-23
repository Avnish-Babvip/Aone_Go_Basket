import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const getFaq = createAsyncThunk(
  "/api/faq",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/faq`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
export const getAboutUs = createAsyncThunk(
  "/api/about-us",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/about-us`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
