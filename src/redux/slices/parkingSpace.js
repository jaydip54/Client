import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/parking-spaces";

// Fetch all parking spaces
export const fetchParkingSpaces = createAsyncThunk(
    "parkingSpaces/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            console.log("🚀 ~ response:", response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Delete parking space (Admin/Owner)
export const deleteParkingSpace = createAsyncThunk(
    "parkingSpaces/delete",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const parkingSpaceSlice = createSlice({
    name: "parkingSpaces",
    initialState: { spaces: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchParkingSpaces.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchParkingSpaces.fulfilled, (state, action) => {
                state.loading = false;
                state.spaces = action.payload;
            })
            .addCase(fetchParkingSpaces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteParkingSpace.fulfilled, (state, action) => {
                state.spaces = state.spaces.filter((space) => space._id !== action.payload);
            });
    },
});

export default parkingSpaceSlice.reducer;
