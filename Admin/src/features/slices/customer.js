import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { editCustomerKycStatus, editCustomerStatus, getAllCustomers, getAllKycDocument } from "../actions/customer";

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
  customerLoading: false,
  customerData: {},
  kycData: {},
};

// ---------------------------------------------------------------------------------------

const customerSlice = createSlice({
  name: "customerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.pending, (state) => {
        state.errorMessage = "";
        state.customerLoading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.customerLoading = false;
        state.customerData = action.payload;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.customerLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(getAllKycDocument.pending, (state) => {
        state.errorMessage = "";
        state.customerLoading = true;
      })
      .addCase(getAllKycDocument.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.customerLoading = false;
        state.kycData = action.payload.data;
      })
      .addCase(getAllKycDocument.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.customerLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(editCustomerStatus.pending, (state) => {
        state.errorMessage = "";
        state.customerLoading = true;
      })
      .addCase(editCustomerStatus.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.customerLoading = false;
        toast("Customer status updated successfully.", {
          description: formattedDate,
        });
      })
      .addCase(editCustomerStatus.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.customerLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(editCustomerKycStatus.pending, (state) => {
        state.errorMessage = "";
        state.customerLoading = true;
      })
      .addCase(editCustomerKycStatus.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.customerLoading = false;
        toast("Customer kyc status updated successfully.", {
          description: formattedDate,
        });
      })
      .addCase(editCustomerKycStatus.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.customerLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = customerSlice.actions;
export default customerSlice.reducer;
