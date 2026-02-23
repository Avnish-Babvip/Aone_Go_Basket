import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const getCustomerAddresses = createAsyncThunk(
  "/api/customer/addresses",
  async (_, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.get("/customer/addresses", {
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

export const addAddress = createAsyncThunk(
  "/api/customer/addAddress",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.post("/customer/address", payload, {
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
export const updateAddress = createAsyncThunk(
  "/api/customer/updateAddress",
  async ({ payload, id }, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.put(`/customer/address/${id}`, payload, {
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

export const setDefaultAddress = createAsyncThunk(
  "/api/customer/address/set-default",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.post(
        "/customer/address/set-default",
        payload,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
export const deleteAddress = createAsyncThunk(
  "/api/customer/address/id",
  async (id, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.delete(`/customer/address/${id}`, {
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
