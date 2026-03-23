import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  deleteCart,
  getCartData,
  updateCart,
  addToCart,
  updateCartCharges,
  reorderCart,
  applyCoupon,
  removeCoupon,
} from "../actions/cart";

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
  cartLoading: false,
  chargesLoading: false,
  couponLoading: false,
  cartData: {
    items: [],
  },
  failedReorderData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state, action) => {
        state.errorMessage = "";
        state.couponLoading = true;
      })

      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.couponLoading = false;
        state.cartData = action.payload.data;
        toast.success("COUPON ADDED.", {
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

      .addCase(applyCoupon.rejected, (state, action) => {
        state.errorMessage = "";
        state.couponLoading = false;
        state.errorMessage = action.payload || "Failed";
        toast.error(action.payload, {
          position: "top-right",
          style: {
            background: "#fb2c36",
            color: "#fff",
            borderRadius: "16px",
            padding: "16px",
            fontWeight: "600",
          },
          duration: 1000,
        });
      })
      .addCase(removeCoupon.pending, (state, action) => {
        state.errorMessage = "";
        state.couponLoading = true;
      })

      .addCase(removeCoupon.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.couponLoading = false;
        state.cartData = action.payload.data;
        toast.success("COUPON REMOVED.", {
          position: "top-right",
          style: {
            background: "#fb2c36",
            color: "#fff",
            borderRadius: "16px",
            padding: "16px",
            fontWeight: "600",
          },
          duration: 500,
        });
      })

      .addCase(removeCoupon.rejected, (state, action) => {
        state.errorMessage = "";
        state.couponLoading = false;
        state.errorMessage = action.payload || "Failed";
      })
      .addCase(reorderCart.pending, (state, action) => {
        state.errorMessage = "";
        state.cartLoading = true;
        state.failedReorderData = [];
      })

      .addCase(reorderCart.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.cartLoading = false;
        state.failedReorderData = action.payload.data;
        toast.success("ADDED TO CART", {
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

      .addCase(reorderCart.rejected, (state, action) => {
        state.errorMessage = "";
        state.cartLoading = false;
        state.failedReorderData = [];
        state.errorMessage = action.payload || "Failed";
        toast(action.payload);
      })
      .addCase(getCartData.pending, (state) => {
        state.errorMessage = "";
        state.cartLoading = false;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.cartLoading = false;
        state.cartData = action.payload.data;
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.cartLoading = false;
        state.errorMessage = action.payload || "Failed";
      })
      .addCase(updateCart.pending, (state, action) => {
        state.errorMessage = "";
        state.cartLoading = true;
        const { id, payload } = action.meta.arg;

        const item = state.cartData.items.find((i) => i.id === id);

        if (item && payload?.quantity !== undefined) {
          item.quantity = payload.quantity;
        }
      })

      .addCase(updateCart.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.cartLoading = false;
        state.cartData = action.payload.data;
        toast.success("CART UPDATED.", {
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

      .addCase(updateCart.rejected, (state, action) => {
        state.errorMessage = "";
        state.cartLoading = false;
        state.errorMessage = action.payload || "Failed";
        toast(action.payload);
      })
      .addCase(addToCart.pending, (state, action) => {
        state.errorMessage = "";
        state.failedReorderData = [];
        state.cartLoading = true;

        const { product_id, product_variation_id, quantity } = action.meta.arg;

        // ensure items exists
        if (!state.cartData?.items) {
          state.cartData = { items: [], subtotal: 0 };
        }

        state.cartData.items.push({
          id: `temp-${Date.now()}`,
          product_id,
          product_variation_id,
          quantity,
          isTemp: true,
        });
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.failedReorderData = [];
        state.cartLoading = false;
        state.cartData = action.payload.data;
        toast.success("ADDED TO CART.", {
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
      .addCase(addToCart.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.chargesLoading = false;
        state.failedReorderData = [];
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(updateCartCharges.pending, (state, action) => {
        state.errorMessage = "";
        state.chargesLoading = true;
      })
      .addCase(updateCartCharges.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.chargesLoading = false;
        state.cartData = action.payload.data;
        // toast.success("SELECTED ADDRESS UPDATED.", {
        //   position: "top-right",
        //   style: {
        //     background: "#79BF28",
        //     color: "#fff",
        //     borderRadius: "16px",
        //     padding: "16px",
        //     fontWeight: "600",
        //   },
        //   duration: 500,
        // });
      })
      .addCase(updateCartCharges.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.cartLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(deleteCart.pending, (state, action) => {
        state.errorMessage = "";
        state.cartLoading = true;
        const id = action.meta.arg;
        // // Optimistic remove from UI
        const item = state.cartData.items.find((i) => i.id === id);
        if (item) {
          item.quantity = 0;
        }
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.cartLoading = false;
        state.cartData = action.payload.data;
        toast.success("REMOVED FROM CART.", {
          position: "top-right",
          style: {
            background: "#fb2c36",
            color: "#fff",
            borderRadius: "16px",
            padding: "16px",
            fontWeight: "600",
          },
          duration: 500,
        });
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.cartLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      });
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
