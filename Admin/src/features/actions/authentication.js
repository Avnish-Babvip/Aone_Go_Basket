import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

// const getCsrfToken = async () => {
//   const response = await instance.get("/site/csrf-token", {
//     headers: headers,
//   });
//   return response.data.csrf_token;
// };

//LOGIN

export const adminLogin = createAsyncThunk(
  "/admin/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/admin/login", payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to post admin login",
      );
    }
  },
);

export const verifyAdmin = createAsyncThunk(
  "/api/admin/verify-otp",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/admin/verify-otp`, payload, {
        withCredentials: false,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed ");
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "admin/forgot-password",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/admin/forgot-password`, payload, {
        withCredentials: false,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed ");
    }
  },
);

export const resetForgotPassword = createAsyncThunk(
  "admin/reset-password",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/admin/reset-password`, payload, {
        withCredentials: false,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed ");
    }
  },
);

export const adminLogout = createAsyncThunk(
  "admin/Logout",
  async (loginToken, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(
        `/admin/logout`,
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
        error.response.data.message || "Failed to logout admin",
      );
    }
  },
);
