import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
import { getGuestToken } from "../../utils/guestToken";

//LOGIN

export const customerLogin = createAsyncThunk(
  "/customer/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/customer/login", payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Failed",
      );
    }
  },
);

export const verifyCustomer = createAsyncThunk(
  "/api/customer/verify-otp",
  async (payload, { rejectWithValue }) => {
    const token = getGuestToken();
    try {
      const { data } = await instance.post(`/customer/verify-otp`, payload, {
        withCredentials: true,
        headers: {
          "X-GUEST-TOKEN": token,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed ");
    }
  },
);

export const customerSignUp = createAsyncThunk(
  "customer/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/customer/register`, payload, {
        withCredentials: false,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" },
      );
    }
  },
);
export const forgotPassword = createAsyncThunk(
  "customer/forgot-password",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(
        `/customer/forgot-password`,
        payload,
        {
          withCredentials: false,
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed ");
    }
  },
);

export const resetForgotPassword = createAsyncThunk(
  "customer/reset-password",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(
        `/customer/reset-password`,
        payload,
        {
          withCredentials: false,
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed ");
    }
  },
);

export const customerLogout = createAsyncThunk(
  "customer/Logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;
      const { data } = await instance.post(
        `/customer/logout`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${loginToken}`,
          },
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to logout ",
      );
    }
  },
);
