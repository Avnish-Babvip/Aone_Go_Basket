import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const getFaq = createAsyncThunk(
  "/api/faq",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/faq`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
export const getAboutUs = createAsyncThunk(
  "/api/about-us",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/about-us`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
export const getPrivacyPolicy = createAsyncThunk(
  "/api/viewPrivacyPolicy",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/viewPrivacyPolicy`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
export const getTermsConditions = createAsyncThunk(
  "/api/termsconditionlist",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/termsconditionlist`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
export const getReturnPolicyList = createAsyncThunk(
  "/api/returnpolicylist",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/returnpolicylist`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
export const getContactSetting = createAsyncThunk(
  "/api/contact-setting",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/contact-setting`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed");
    }
  },
);
