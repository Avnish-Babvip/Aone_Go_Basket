import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const getHomeData = createAsyncThunk(
  "/api/customer/home",
  async (_, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;
      const link = `/customer/home`;
      const { data } = await instance.get(link, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);

export const getHomeContent = createAsyncThunk(
  "/api/home",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/home`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);

export const siteSettings = createAsyncThunk(
  "/api/site-settings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/site-settings`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
