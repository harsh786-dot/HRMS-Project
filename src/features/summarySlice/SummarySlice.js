import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSummary = createAsyncThunk('summary/fetchSummary',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/dashboard/summary/');
            console.log(response.data);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        } 
    }
); 

const SummarySlice = createSlice({
    name: 'summary',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default SummarySlice.reducer;