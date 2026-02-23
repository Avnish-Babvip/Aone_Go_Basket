import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { getAllCategoriesWithSubCategories } from "../actions/category";

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
  categoryLoading: false,
  categoryData: [],
  priceData: {},
};

// ---------------------------------------------------------------------------------------

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllCategoriesWithSubCategories.pending, (state) => {
        state.errorMessage = "";
        state.categoryLoading = true;
      })
      .addCase(getAllCategoriesWithSubCategories.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.categoryLoading = false;
        state.categoryData = action.payload.data;
        state.priceData = action.payload.price_range;
      })
      .addCase(getAllCategoriesWithSubCategories.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.categoryLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = categorySlice.actions;
export default categorySlice.reducer;
