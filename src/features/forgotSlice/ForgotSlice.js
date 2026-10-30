import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendOtp = createAsyncThunk(
  "forgotPassword/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/accounts/forgot-password/",
        { email }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Unable to send OTP"
      );
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgot",
  initialState: {
    loading: false,
    success: false,
    message: "",
    error: null,
  },
  reducers: {
    resetForgotPassword: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = "";
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload.message || "OTP sent successfully";
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetForgotPassword } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
