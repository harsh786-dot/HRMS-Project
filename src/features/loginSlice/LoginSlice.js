
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/accounts/login/",
        loginData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || "Login failed",
        } 
      );
    }
  }
);

const LoginSlice = createSlice({
  name: "login",

  initialState: {
    data: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearLoginError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLoginError } = LoginSlice.actions;

export default LoginSlice.reducer;
