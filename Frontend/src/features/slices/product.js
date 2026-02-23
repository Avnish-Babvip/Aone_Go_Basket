import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { getAllProducts, getRelatedProducts } from "../actions/product";

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
  productLoading: false,
  productData: [],
  relatedProductData: [],
};

// ---------------------------------------------------------------------------------------

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.errorMessage = "";
        state.productLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.productLoading = false;
        state.productData = action.payload.data;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.productLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(getRelatedProducts.pending, (state) => {
        state.errorMessage = "";
        state.productLoading = true;
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.productLoading = false;
        state.relatedProductData = action.payload.data;
      })
      .addCase(getRelatedProducts.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.productLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = productSlice.actions;
export default productSlice.reducer;
