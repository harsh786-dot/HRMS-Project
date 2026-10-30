import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const resetPassword = createAsyncThunk(
    "newPassword/resetPassword",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "/api/accounts/reset-password/",
                payload
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message:
                        error.message ||
                        "Unable to reset password. Please try again.",
                }
            );
        }
    }
);

const initialState = {
    loading: false,
    success: false,
    error: null,
    message: null,
};

const newPasswordSlice = createSlice({
    name: "newPassword",
    initialState,

    reducers: {
        clearResetPasswordState: () => initialState,
    },

    extraReducers: (builder) => {
        builder
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
                state.message = null;
            })

            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message =
                    action.payload?.message ||
                    action.payload?.detail ||
                    "Password reset successfully.";
            })

            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error =
                    action.payload || {
                        message:
                            action.error?.message ||
                            "Unable to reset password. Please try again.",
                    };
            });
    },
});

export const { clearResetPasswordState } =
    newPasswordSlice.actions;

export default newPasswordSlice.reducer;