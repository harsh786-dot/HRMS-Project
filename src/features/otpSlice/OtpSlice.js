
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyOtp = createAsyncThunk(
    "otpVerify/verifyOtp",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            if (!email || !otp) {
                return rejectWithValue(
                    "Email and OTP are required."
                );
            }

            const response = await axios.post(
                "/api/accounts/verify-reset-otp/",
                {
                    email: email.trim(),
                    otp: String(otp),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error(
                "OTP API error:",
                error.response?.status,
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data || {
                    message: "OTP verification failed. Please try again.",
                }
            );
        }
    }
);

const otpVerifySlice = createSlice({
    name: "otpVerify",

    initialState: {
        loading: false,
        success: false,
        error: null,
        data: null,
    },

    reducers: {
        resetVerifyState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.data = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
                state.data = null;
            })

            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.data = action.payload;
                state.error = null;
            })

            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || {
                    message: action.error.message || "OTP verification failed.",
                };
            });
    },
});

export const { resetVerifyState } = otpVerifySlice.actions;

export default otpVerifySlice.reducer;
