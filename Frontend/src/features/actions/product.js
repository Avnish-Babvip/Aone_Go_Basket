import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const getAllProducts = createAsyncThunk(
  "/api/customer/products",
  async (
    { search, page, per_page, sort, min_price, max_price, category_slug },
    { getState, rejectWithValue },
  ) => {
    try {
      const loginToken = getState().authentication?.customerData?.token;
      const params = new URLSearchParams();

      params.append("page", page || 1);
      params.append("per_page", per_page || 12);

      if (search) params.append("search", search);
      if (sort) params.append("sort", sort);
      if (max_price) params.append("max_price", max_price);
      if (min_price) params.append("min_price", min_price);
      if (category_slug) params.append("category_slug", category_slug);

      const link = `/customer/products?${params.toString()}`;

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

export const getRelatedProducts = createAsyncThunk(
  "api/customer/products-related/slug/aashirvaad-wheat-atta",
  async (slug, { rejectWithValue }) => {
    try {
      const link = `/customer/products-related/slug/${slug}`;

      const { data } = await instance.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
