import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCandidate = createAsyncThunk('candidate/fetchCandidate',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/candidate/');
            console.log(response.data);
            return response.data.results; 
        } catch (error) {

            return rejectWithValue(error.message);
        } 
    } 
);  

const CandidateSlice = createSlice({
    name: 'candidate',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchCandidate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default CandidateSlice.reducer;