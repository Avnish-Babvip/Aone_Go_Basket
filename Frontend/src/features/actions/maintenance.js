import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const getMaintenanceStatus = createAsyncThunk(
  "/api/customer/app-status",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/customer/app-status`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
export const submitMaintenanceContact = createAsyncThunk(
  "/api/customer/maintenance-contact",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(
        `/customer/maintenance-contact`,
        payload,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
