import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  getCities,
  getCountries,
  getPincode,
  getStates,
} from "../actions/location";

const formattedDate = new Date().toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const initialState = {
  errorMessage: "",
  locationLoading: false,
  countryData: [],
  stateData: [],
  cityData: [],
  pincodeData: [],
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getCountries.pending, (state) => {
        state.errorMessage = "";
        state.locationLoading = true;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.locationLoading = false;
        state.countryData = action.payload.data;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.locationLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(getStates.pending, (state) => {
        state.errorMessage = "";
        state.locationLoading = true;
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.locationLoading = false;
        state.stateData = action.payload.data;
      })
      .addCase(getStates.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.locationLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(getCities.pending, (state) => {
        state.errorMessage = "";
        state.locationLoading = true;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.locationLoading = false;
        state.cityData = action.payload.data;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.locationLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(getPincode.pending, (state) => {
        state.errorMessage = "";
        state.locationLoading = true;
      })
      .addCase(getPincode.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.locationLoading = false;
        state.pincodeData = action.payload.data;
      })
      .addCase(getPincode.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.locationLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      });
  },
});

export const {} = locationSlice.actions;

export default locationSlice.reducer;
