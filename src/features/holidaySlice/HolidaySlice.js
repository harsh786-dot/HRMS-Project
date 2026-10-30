
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHoliday = createAsyncThunk(
    "holidays/fetchHoliday",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/employees/holidays/");

            console.log("Holiday API Response:", response.data);

            // API response ke format ke according array nikalo
            return response.data.results ?? response.data.holidays ?? response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                error.message ||
                "Failed to fetch holidays"
            );
        }
    }
);

const HolidaySlice = createSlice({
    name: "holidays",

    initialState: {
        holidays: [],
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchHoliday.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchHoliday.fulfilled, (state, action) => {
                state.loading = false;

                // Agar response mein array directly nahi hai,
                // toh holidays property se array lene ki koshish karo
                const payload = action.payload;

                state.holidays = Array.isArray(payload)
                    ? payload
                    : Array.isArray(payload?.holidays)
                    ? payload.holidays
                    : [];

                state.error = null;
            })

            .addCase(fetchHoliday.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default HolidaySlice.reducer;
