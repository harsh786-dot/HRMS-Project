import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotification = createAsyncThunk('notification/fetchNotification',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/employees/notifications/');
            console.log(response.data);
            return response.data.results; 
        } catch (error) {

            return rejectWithValue(error.message);
        }
    }
); 

const NotificationSlice = createSlice({
    name: 'notification',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default NotificationSlice.reducer;