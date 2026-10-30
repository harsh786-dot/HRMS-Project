import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAttendanceOverview = createAsyncThunk(
  "attendanceOverview/fetchAttendanceOverview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/api/dashboard/attendance-overview/"
      );

      console.log("Attendance Overview API:", response.data);

      const result = Array.isArray(response.data)
        ? response.data
        : response.data.results ??
          response.data.data ??
          response.data.attendance_overview ??
          response.data.attendanceOverview;

      if (!Array.isArray(result)) {
        return rejectWithValue(
          "API response mein attendance array nahi mila."
        );
      }

      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch attendance overview"
      );
    }
  }
);

const attendanceOverviewSlice = createSlice({
  name: "attendanceOverview",

  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAttendanceOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchAttendanceOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default attendanceOverviewSlice.reducer;
