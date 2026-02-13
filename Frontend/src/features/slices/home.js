import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { getHomeData } from "../actions/home";

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
  homeLoading: false,
  homeData: [],
};

// ---------------------------------------------------------------------------------------

const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getHomeData.pending, (state) => {
        state.errorMessage = "";
        state.homeLoading = true;
      })
      .addCase(getHomeData.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.homeLoading = false;
        state.homeData = action.payload.data;
      })
      .addCase(getHomeData.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.homeLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = homeSlice.actions;
export default homeSlice.reducer;
