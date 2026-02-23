import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const getCountries = createAsyncThunk(
  "/api/customer/locations/countries",
  async (_, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.get("/customer/locations/countries", {
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
  "/api/customer/locations/states/countryid",
  async (id, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.get(`/customer/locations/states/${id}`, {
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
  "/api/customer/locations/cities/stateid",
  async (id, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.get(`/customer/locations/cities/${id}`, {
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
export const getPincode = createAsyncThunk(
  "/api/customer/locations/pincode/cityid",
  async (id, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.get(`/customer/locations/pincode/${id}`, {
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
