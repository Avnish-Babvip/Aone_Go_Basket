import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const getCountries = createAsyncThunk(
  "/api/admin/locations/countries",
  async (_, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.adminData?.token;

      const { data } = await instance.get("/admin/locations/countries", {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  },
);
export const getStates = createAsyncThunk(
  "/api/admin/locations/states/countryid",
  async (id, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.adminData?.token;

      const { data } = await instance.get(`/admin/locations/states/${id}`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  },
);
export const getCities = createAsyncThunk(
  "/api/admin/locations/cities/stateid",
  async (id, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.adminData?.token;

      const { data } = await instance.get(`/admin/locations/cities/${id}`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  },
);

