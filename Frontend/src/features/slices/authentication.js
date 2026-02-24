import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  changePassword,
  customerLogin,
  customerLogout,
  customerSignUp,
  forgotPassword,
  resetForgotPassword,
  verifyCustomer,
} from "../actions/authentication";

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
  isLoading: false,
  isCredentials: false,
  isCustomerLoggedIn: false,
  customerData: {},
  errorMessage: "",
  loginCredentials: {
    email: "",
    password: "",
  },
};

// ---------------------------------------------------------------------------------------

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetUserState: (state) => {
      ((state.isLoading = false),
        (state.isCredentials = false),
        (state.isPasswordChanged = false),
        (state.errorMessage = ""),
        (state.loginCredentials = {
          email: "",
          password: "",
        }));
    },
    resetInterceptorState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        toast("PASSWORD CHANGED", {
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
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed to login API.";
        toast(action.payload, {
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
      .addCase(customerLogin.pending, (state) => {
        state.isLoading = true;
        state.isCredentials = false;
        state.errorMessage = "";
      })
      .addCase(customerLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.isCredentials = true;
        state.customerData = action.payload;
        // ✅ SAVE EMAIL
        state.loginCredentials.email = action.meta.arg.login;
        state.loginCredentials.password = action.meta.arg.password;
        toast("OTP sent to registered email", {
          description: formattedDate,
        });
      })
      .addCase(customerLogin.rejected, (state, action) => {
        state.isCredentials = false;
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed to login API.";
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(customerSignUp.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(customerSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        toast("Your account has been successfully registered.", {
          description: formattedDate,
        });
      })
      .addCase(customerSignUp.rejected, (state, action) => {
        state.isLoading = false;
        const payload = action.payload;

        // ✅ Validation errors from backend
        if (payload?.data?.errors) {
          Object.values(payload.data.errors).forEach((messages) => {
            messages.forEach((msg) => {
              toast.error(msg, {
                description: formattedDate,
              });
            });
          });

          state.errorMessage = payload.message || "Validation error";
        } else {
          // ✅ Fallback error
          const message = payload?.message || payload || "Failed";
          state.errorMessage = message;

          toast.error(message, {
            description: formattedDate,
          });
        }
      })
      .addCase(verifyCustomer.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
        state.isCustomerLoggedIn = false;
      })
      .addCase(verifyCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.isCustomerLoggedIn = true;
        state.isCredentials = false;
        state.customerData = action.payload.data;
        toast("You have logged in.", {
          description: formattedDate,
        });
      })
      .addCase(verifyCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isCustomerLoggedIn = false;
        state.errorMessage = action.payload || "Failed.";
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        toast("Password reset link sent to email.", {
          description: formattedDate,
        });
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed.";
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(resetForgotPassword.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(resetForgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        toast("Password changed successfully.", {
          description: formattedDate,
        });
      })
      .addCase(resetForgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed.";
        toast(action.payload, {
          description: formattedDate,
        });
      })
      .addCase(customerLogout.pending, (state) => {
        state.errorMessage = "";
      })
      .addCase(customerLogout.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.isCustomerLoggedIn = false;
        state.customerData = {};
        toast("Log out Successful.", {
          description: formattedDate,
        });
      })
      .addCase(customerLogout.rejected, (state, action) => {
        state.errorMessage = action.payload || "Failed to logout API.";
        toast("Logout failed. Please try again", {
          description: formattedDate,
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const { resetUserState, resetInterceptorState } = authSlice.actions;
export default authSlice.reducer;
