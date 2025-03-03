import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Atoms/constatnt";

const API_URL = `${baseUrl}pspace`;

// Fetch all parking spaces (Everyone)
export const fetchParkingSpaces = createAsyncThunk(
    "parkingSpaces/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            return response.data.parkingSpaces;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching data");
        }
    }
);

// Create a new parking space (Admin/Owner Only)
export const addParkingSpace = createAsyncThunk(
    "parkingSpaces/add",
    async (name, { rejectWithValue }) => {
        console.log("🚀 ~ data:", name)
        try {
            const response = await axios.post(API_URL, {name});
            return response.data.parkingSpace;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error adding parking space");
        }
    }
);

// Update an existing parking space (Admin/Owner Only)
export const updateParkingSpace = createAsyncThunk(
    "parkingSpaces/update",
    async ({ id, data }, { rejectWithValue }) => {

        try {
            const response = await axios.put(`${API_URL}/${id}`, data
            );
            return response.data.updatedParkingSpace;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error updating parking space");
        }
    }
);

// Delete a parking space (Admin/Owner Only)
export const deleteParkingSpace = createAsyncThunk(
    "parkingSpaces/delete",
    async (id, { rejectWithValue }) => {

        try {
            await axios.delete(`${API_URL}/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting parking space");
        }
    }
);

const parkingSpaceSlice = createSlice({
    name: "parkingSpaces",
    initialState: { spaces: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all parking spaces
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

            // Add a new parking space
            .addCase(addParkingSpace.fulfilled, (state, action) => {
                state.spaces.push(action.payload);
            })

            // Update a parking space
            .addCase(updateParkingSpace.fulfilled, (state, action) => {
                state.spaces = state.spaces.map(space =>
                    space._id === action.payload._id ? action.payload : space
                );
            })

            // Delete a parking space
            .addCase(deleteParkingSpace.fulfilled, (state, action) => {
                state.spaces = state.spaces.filter(space => space._id !== action.payload);
            });
    },
});

export default parkingSpaceSlice.reducer;
