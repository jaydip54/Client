import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Atoms/constatnt";

const API_URL = `${baseUrl}assign`; // Adjust as per your backend route

export const fetchParkingAssignments = createAsyncThunk(
    "parkingAssignment/fetch",
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, {
                headers: { Authorization: `${token}` }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addParkingAssignment = createAsyncThunk(
    "parkingAssignment/add",
    async ({ businessPlaceId, parkingSpaceId, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, { businessPlaceId, parkingSpaceId }, {
                headers: { Authorization: `${token}` }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateParkingAssignment = createAsyncThunk(
    "parkingAssignment/update",
    async ({ id, updatedData, token }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData, {
                headers: { Authorization: `${token}` }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteParkingAssignment = createAsyncThunk(
    "parkingAssignment/delete",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const parkingAssignmentSlice = createSlice({
    name: "parkingAssignment",
    initialState: { assignments: [], isLoading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchParkingAssignments.pending, (state) => { state.isLoading = true; })
            .addCase(fetchParkingAssignments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.assignments = action.payload;
            })
            .addCase(fetchParkingAssignments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addParkingAssignment.fulfilled, (state, action) => {
                state.assignments.push(action.payload);
            })
            .addCase(updateParkingAssignment.fulfilled, (state, action) => {
                const index = state.assignments.findIndex(a => a._id === action.payload._id);
                if (index !== -1) state.assignments[index] = action.payload;
            })
            .addCase(deleteParkingAssignment.fulfilled, (state, action) => {
                state.assignments = state.assignments.filter(a => a._id !== action.payload);
            });
    }
});

export default parkingAssignmentSlice.reducer;
