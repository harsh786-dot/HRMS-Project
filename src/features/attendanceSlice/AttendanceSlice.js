import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAttendance = createAsyncThunk('attendance/fetchAttendance',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/dashboard/today-attendance/');
            console.log(response.data);
            return response.data.attendance; 
        } catch (error) {

            return rejectWithValue(error.message);
        } 
    }
); 

const AttendanceSlice = createSlice({
    name: 'attendance',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAttendance.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAttendance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default AttendanceSlice.reducer;