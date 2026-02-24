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
  async ({ page, status }, { getState, rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      const loginToken = getState().authentication?.customerData?.token;

      params.append("page", page || 1);
      if (status) params.append("status", status);

      const link = `/customer/orders?${params.toString()}`;

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

export const paymentStatus = createAsyncThunk(
  "customer/payment/details/AGB043",
  async (id, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.get(`/customer/payment/details/${id}`, {
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
