import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  cancelOrder,
  checkout,
  checkPendingStatus,
  downloadInvoice,
  orderDetails,
  orderHistory,
  paymentStatus,
  retryPaymentOrder,
} from "../actions/order";

const initialState = {
  errorMessage: "",
  orderLoading: false,
  cancelLoading: false,
  invoiceLoading: false,
  retryLoading: false,
  orderData: [],
  orderDetailData: {},
  retryPaymentData: {},
  paymentData: {},
  pendingStatus: {},
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
          duration: 500,
        });
      })

      .addCase(checkout.rejected, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = false;
        state.errorMessage = action.payload || "Failed";
      })
      .addCase(retryPaymentOrder.pending, (state, action) => {
        state.errorMessage = "";
        state.retryLoading = true;
      })

      .addCase(retryPaymentOrder.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.retryLoading = false;
        state.retryPaymentData = action.payload;
      })

      .addCase(retryPaymentOrder.rejected, (state, action) => {
        state.errorMessage = "";
        state.retryLoading = false;
        state.errorMessage = action.payload || "Failed";
        toast(action.payload);
      })
      .addCase(downloadInvoice.pending, (state, action) => {
        state.errorMessage = "";
        state.invoiceLoading = true;
      })

      .addCase(downloadInvoice.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.invoiceLoading = false;
      })

      .addCase(downloadInvoice.rejected, (state, action) => {
        state.errorMessage = "";
        state.invoiceLoading = false;
        state.errorMessage = action.payload || "Failed";
        toast(action.payload);
      })
      .addCase(cancelOrder.pending, (state, action) => {
        state.errorMessage = "";
        state.cancelLoading = true;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.cancelLoading = false;
        state.paymentData = action.payload.order;
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.errorMessage = "";
        state.cancelLoading = false;
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
      .addCase(checkPendingStatus.pending, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = true;
      })

      .addCase(checkPendingStatus.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.orderLoading = false;
        state.pendingStatus = action.payload;
      })

      .addCase(checkPendingStatus.rejected, (state, action) => {
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
