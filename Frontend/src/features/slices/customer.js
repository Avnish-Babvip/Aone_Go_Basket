import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  addAddress,
  addBusinessInfo,
  deleteAddress,
  getBusinessInfo,
  getCustomerAddresses,
  getCustomerDetails,
  getCustomerKycStatus,
  setDefaultAddress,
  submitKyc,
  updateAddress,
  updateBusinessInfo,
  updateProfile,
} from "../actions/customer";

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
  businessLoading: false,
  kycLoading: false,
  addressLoading: false,
  businessData: {},
  kycData: {},
  profileData: {},
  addressData: [],
  defaultAddressData: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getBusinessInfo.pending, (state) => {
        state.errorMessage = "";
      })
      .addCase(getBusinessInfo.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.businessData = action.payload.data;
      })
      .addCase(getBusinessInfo.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(getCustomerKycStatus.pending, (state) => {
        state.errorMessage = "";
      })
      .addCase(getCustomerKycStatus.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.kycData = action.payload.data;
      })
      .addCase(getCustomerKycStatus.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(getCustomerDetails.pending, (state) => {
        state.errorMessage = "";
      })
      .addCase(getCustomerDetails.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.profileData = action.payload.data;
      })
      .addCase(getCustomerDetails.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
      })
      .addCase(getCustomerAddresses.pending, (state) => {
        state.errorMessage = "";
        state.addressLoading = true;
      })
      .addCase(getCustomerAddresses.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = false;
        state.addressData = action.payload.data;
      })
      .addCase(getCustomerAddresses.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed";
        state.addressLoading = false;
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(addBusinessInfo.pending, (state, action) => {
        state.errorMessage = "";
        state.businessLoading = true;
      })

      .addCase(addBusinessInfo.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.businessLoading = false;
        toast.success("BUSSINESS INFORMATION ADDED.", {
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

      .addCase(addBusinessInfo.rejected, (state, action) => {
        state.errorMessage = "";
        state.businessLoading = false;
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
        });
      })
      .addCase(updateBusinessInfo.pending, (state, action) => {
        state.errorMessage = "";
        state.businessLoading = true;
      })

      .addCase(updateBusinessInfo.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.businessLoading = false;
        toast.success("BUSSINESS INFORMATION UPDATED.", {
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

      .addCase(updateBusinessInfo.rejected, (state, action) => {
        state.errorMessage = "";
        state.businessLoading = false;
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
        });
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.errorMessage = "";
        state.customerLoading = true;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.customerLoading = false;
        toast.success("PROFILE UPDATED.", {
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

      .addCase(updateProfile.rejected, (state, action) => {
        state.errorMessage = "";
        state.customerLoading = false;
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
        });
      })
      .addCase(submitKyc.pending, (state, action) => {
        state.errorMessage = "";
        state.kycLoading = true;
      })

      .addCase(submitKyc.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.kycLoading = false;
        toast.success("KYC DOCUMENT SUBMITTED.", {
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

      .addCase(submitKyc.rejected, (state, action) => {
        state.errorMessage = "";
        state.kycLoading = false;
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
        });
      })
      .addCase(addAddress.pending, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = true;
      })

      .addCase(addAddress.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = false;
        toast.success("ADDRESS ADDED.", {
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

      .addCase(addAddress.rejected, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = false;
        state.errorMessage = action.payload || "Failed";
        toast(action.payload);
      })
      .addCase(updateAddress.pending, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = true;
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = false;
        toast.success("ADDRESS UPDATED.", {
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

      .addCase(updateAddress.rejected, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = false;
        state.errorMessage = action.payload || "Failed";
        toast(action.payload);
      })
      .addCase(setDefaultAddress.pending, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = true;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = false;
        state.defaultAddressData = action.meta.arg.address_id;
        toast.success("DEFAULT ADDRESS UPDATED.", {
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
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = false;
        state.errorMessage = action.payload || "Failed";
        toast(action.payload);
      })
      .addCase(deleteAddress.pending, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = false;
        toast.success("ADDRESS DELETED.", {
          position: "top-right",
          style: {
            background: "#fb2c36",
            color: "#fff",
            borderRadius: "16px",
            padding: "16px",
            fontWeight: "600",
          },
        });
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.errorMessage = "";
        state.addressLoading = false;
        state.errorMessage = action.payload || "Failed";
        toast(action.payload);
      });
  },
});

export const {} = customerSlice.actions;

export default customerSlice.reducer;
