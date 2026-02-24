import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { editOrderStatus, getAllOrders } from "../actions/order";

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
  orderLoading: false,
  orderData: {},
};

// ---------------------------------------------------------------------------------------

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.errorMessage = "";
        state.orderLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = false;
        state.orderData = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.orderLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(editOrderStatus.pending, (state) => {
        state.errorMessage = "";
        state.orderLoading = true;
      })
      .addCase(editOrderStatus.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = false;
        toast("Order status updated successfully.", {
          description: formattedDate,
        });
      })
      .addCase(editOrderStatus.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.orderLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = orderSlice.actions;
export default orderSlice.reducer;
