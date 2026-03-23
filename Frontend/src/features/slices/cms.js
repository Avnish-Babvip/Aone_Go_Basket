import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { getAboutUs, getFaq } from "../actions/cms";

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
  cmsLoading: false,
  faqData: {},
  aboutUsData: {},
};

// ---------------------------------------------------------------------------------------

const cmsSlice = createSlice({
  name: "cmsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFaq.pending, (state) => {
        state.errorMessage = "";
        state.cmsLoading = true;
      })
      .addCase(getFaq.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.cmsLoading = false;
        state.faqData = action.payload.data;
      })
      .addCase(getFaq.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.cmsLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(getAboutUs.pending, (state) => {
        state.errorMessage = "";
        state.cmsLoading = true;
      })
      .addCase(getAboutUs.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.cmsLoading = false;
        state.aboutUsData = action.payload.data;
      })
      .addCase(getAboutUs.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.cmsLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = cmsSlice.actions;
export default cmsSlice.reducer;
