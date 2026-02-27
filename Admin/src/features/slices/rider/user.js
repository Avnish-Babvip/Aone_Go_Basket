import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { getRiderProfile } from "../../actions/rider/user";

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
  profileData: {},
};

// ---------------------------------------------------------------------------------------

const rider_profileSlice = createSlice({
  name: "rider_OrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRiderProfile.pending, (state) => {
        state.errorMessage = "";
      })
      .addCase(getRiderProfile.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.profileData = action.payload.data;
      })
      .addCase(getRiderProfile.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        toast(action.payload, {
          description: formattedDate,
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = rider_profileSlice.actions;
export default rider_profileSlice.reducer;
