import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  getMaintenanceStatus,
  submitMaintenanceContact,
} from "../actions/maintenance";

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
  maintenanceLoading: false,
  maintenanceData: {},
};

// ---------------------------------------------------------------------------------------

const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getMaintenanceStatus.pending, (state) => {
        state.errorMessage = "";
      })
      .addCase(getMaintenanceStatus.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.maintenanceData = action.payload.data;
      })
      .addCase(getMaintenanceStatus.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(submitMaintenanceContact.pending, (state) => {
        state.errorMessage = "";
        state.maintenanceLoading = true;
      })
      .addCase(submitMaintenanceContact.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.maintenanceLoading = false;
        toast.success("Enquiry Form Submitted.", {
          position: "top-right",
          style: {
            background: "#79BF28",
            color: "#fff",
            borderRadius: "16px",
            padding: "16px",
            fontWeight: "600",
          },
        });
      })
      .addCase(submitMaintenanceContact.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.maintenanceLoading = false;
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
