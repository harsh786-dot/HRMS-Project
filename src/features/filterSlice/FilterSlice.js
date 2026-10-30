import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFilter = createAsyncThunk('filter/fetchFilter',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/employees/filter/');
            console.log(response.data);
            return response.data.results; 
        } catch (error) {

            return rejectWithValue(error.message);
        }
    }
); 

const FilterSlice = createSlice({
    name: 'filter',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilter.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchFilter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default FilterSlice.reducer;