import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
import { getGuestToken } from "../../utils/guestToken";

export const getCartData = createAsyncThunk(
  "/api/customer/cart/",
  async (_, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const headers = {};
      console.log(loginToken);

      if (loginToken) {
        // ✅ Logged in user
        headers.Authorization = `Bearer ${loginToken}`;
      } else {
        // ✅ Guest user
        const guestToken = getGuestToken();
        headers["X-GUEST-TOKEN"] = guestToken;
      }

      const { data } = await instance.get("/customer/cart", {
        headers,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  },
);

export const addToCart = createAsyncThunk(
  "/api/customer/cart/add",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const headers = {};

      if (loginToken) {
        // ✅ Logged in user
        headers.Authorization = `Bearer ${loginToken}`;
      } else {
        // ✅ Guest user
        const guestToken = getGuestToken();
        headers["X-GUEST-TOKEN"] = guestToken;
      }
      const { data } = await instance.post(`/customer/cart/add`, payload, {
        headers,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);

export const updateCart = createAsyncThunk(
  "/api/customer/cart/update",
  async ({ id, payload }, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;
      console.log("first");
      const headers = {};

      if (loginToken) {
        // ✅ Logged in user
        headers.Authorization = `Bearer ${loginToken}`;
      } else {
        // ✅ Guest user
        const guestToken = getGuestToken();
        headers["X-GUEST-TOKEN"] = guestToken;
      }
      const { data } = await instance.put(
        `/customer/cart/item/${id}`,
        payload,
        {
          headers,
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);

export const deleteCart = createAsyncThunk(
  "/api/customer/cart/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const headers = {};

      if (loginToken) {
        // ✅ Logged in user
        headers.Authorization = `Bearer ${loginToken}`;
      } else {
        // ✅ Guest user
        const guestToken = getGuestToken();
        headers["X-GUEST-TOKEN"] = guestToken;
      }
      const { data } = await instance.delete(`/customer/cart/item/${id}`, {
        headers,
      });
      return data;
    } catch (error) {
      return rejectWithValue("Failed");
    }
  },
);

export const updateCartCharges = createAsyncThunk(
  "/api/customer/cart/updateCartCharges",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.post(
        `/customer/cart/update-addresses`,
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

export const reorderCart = createAsyncThunk(
  "/api/customer/orders/reorder/10",
  async (id, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.post(
        `/customer/orders/reorder/${id}`,
        {},
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
