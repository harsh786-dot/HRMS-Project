import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/employees/');
            console.log(response.data);
            return response.data.results; 
        } catch (error) {

            return rejectWithValue(error.message);
        } 
    }
); 

const EmployeesSlice = createSlice({
    name: 'employees',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default EmployeesSlice.reducer;