import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPayRoll = createAsyncThunk('payRoll/fetchPayRoll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/employees/payroll/');
            console.log(response.data);
            return response.data.results; 
        } catch (error) {

            return rejectWithValue(error.message);
        } 
    } 
); 

const PayRollSlice = createSlice({
    name: 'payRoll',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayRoll.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayRoll.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPayRoll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default PayRollSlice.reducer;