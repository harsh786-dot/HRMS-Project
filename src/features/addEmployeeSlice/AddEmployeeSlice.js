
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addEmployee = createAsyncThunk(
  "addemployee/addEmployee",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/employees/",
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const initialState = {
  loading: false,
  employee: null,
  error: null,
  success: false,
};

const addEmployeeSlice = createSlice({
  name: "addemployee",
  initialState,
  reducers: {
    resetEmployeeState: (state) => {
      state.loading = false;
      state.employee = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
        state.success = true;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.success = false;
      });
  },
});

export const { resetEmployeeState } = addEmployeeSlice.actions;

export default addEmployeeSlice.reducer;
