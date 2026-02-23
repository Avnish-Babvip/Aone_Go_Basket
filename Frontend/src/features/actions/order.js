import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const checkout = createAsyncThunk(
  "/api/customer/checkout",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.post("/customer/checkout", payload, {
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

export const orderHistory = createAsyncThunk(
  "/api/customer/orders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.get("/customer/orders", {
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

export const orderDetails = createAsyncThunk(
  "/api/customer/orders/slug",
  async (id, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.get(`/customer/orders/${id}`, {
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
