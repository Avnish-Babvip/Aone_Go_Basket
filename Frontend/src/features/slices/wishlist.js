import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../actions/wishlist";

const initialState = {
  errorMessage: "",
  wishlistLoading: false,
  wishlistData: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state, action) => {
        state.errorMessage = "";
        state.wishlistLoading = true;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.wishlistLoading = false;
        toast.success("ADDED TO WISHLIST", {
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

      .addCase(addToWishlist.rejected, (state, action) => {
        state.errorMessage = "";
        state.wishlistLoading = false;
        if (action.payload?.status === 401) {
          toast.error("Please log in to continue", {
            position: "top-right",
            duration: 800,
          });
        } else {
          state.errorMessage = action.payload || "Failed";
        }
      })
      .addCase(removeFromWishlist.pending, (state, action) => {
        state.errorMessage = "";
        state.wishlistLoading = true;
      })

      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.wishlistLoading = false;
        toast.success("Removed from Wishlist", {
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

      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.errorMessage = "";
        state.wishlistLoading = false;

        if (action.payload?.status === 401) {
          toast.error("Please log in to continue", {
            position: "top-right",
            duration: 800,
          });
        } else {
          state.errorMessage = action.payload || "Failed";
        }
      })
      .addCase(getWishlist.pending, (state, action) => {
        state.errorMessage = "";
        state.wishlistLoading = true;
      })

      .addCase(getWishlist.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.wishlistLoading = false;
        state.wishlistData = action.payload.data;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.errorMessage = "";
        state.wishlistLoading = false;
        if (action.payload?.status === 401) {
          toast.error("Please log in to continue", {
            position: "top-right",
            duration: 800,
          });
        } else {
          state.errorMessage = action.payload || "Failed";
        }
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
