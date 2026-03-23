import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const addToWishlist = createAsyncThunk(
  "/api/customer/wishlists/1",
  async (id, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.post(
        `/customer/wishlists/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response || "Failed");
    }
  },
);

export const removeFromWishlist = createAsyncThunk(
  "/api/customer/wishlists/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const { data } = await instance.delete(`/customer/wishlists/${id}`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response || "Failed");
    }
  },
);

export const getWishlist = createAsyncThunk(
  "/api/customer/wishlists",
  async ({ page, per_page }, { getState, rejectWithValue }) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;

      const params = new URLSearchParams();

      params.append("page", page || 1);
      params.append("per_page", per_page || 12);

      const link = `/customer/wishlists?${params.toString()}`;

      const { data } = await instance.get(link, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response || "Failed");
    }
  },
);
