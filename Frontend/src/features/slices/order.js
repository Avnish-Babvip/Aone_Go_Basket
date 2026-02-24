import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  checkout,
  orderDetails,
  orderHistory,
  paymentStatus,
} from "../actions/order";

const initialState = {
  errorMessage: "",
  orderLoading: false,
  orderData: [],
  orderDetailData: {},
  paymentData: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = true;
      })

      .addCase(checkout.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = false;
        toast.success("Thank you.", {
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

      .addCase(checkout.rejected, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = false;
        state.errorMessage = action.payload || "Failed";
        toast(action.payload);
      })
      .addCase(paymentStatus.pending, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = true;
      })

      .addCase(paymentStatus.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = false;
        state.paymentData = action.payload.order;
      })

      .addCase(paymentStatus.rejected, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = false;
        state.errorMessage = action.payload || "Failed";
        toast(action.payload);
      })
      .addCase(orderHistory.pending, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = true;
      })

      .addCase(orderHistory.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = false;
        state.orderData = action.payload;
      })
      .addCase(orderHistory.rejected, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = false;
        state.errorMessage = action.payload || "Failed";
        toast(action.payload);
      })
      .addCase(orderDetails.pending, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = true;
      })

      .addCase(orderDetails.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = false;
        state.orderDetailData = action.payload.data;
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = false;
        state.errorMessage = action.payload || "Failed";
        toast(action.payload);
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
