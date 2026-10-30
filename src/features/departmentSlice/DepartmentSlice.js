import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDepartment = createAsyncThunk('employees/fetchDepartment',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/employees/departments/');
            console.log(response.data);
            console.log("API Response:", response.data);
console.log("Is Array:", Array.isArray(response.data));
            return response.data.results; 
        } catch (error) {

            return rejectWithValue(error.message);
        } 
    }
); 

const DepartmentSlice = createSlice({
    name: 'department',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartment.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDepartment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default DepartmentSlice.reducer;