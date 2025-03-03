import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// Create (Assign Parking)
export const assignParkingSpace = createAsyncThunk(
    "parking/assignParkingSpace",
    async ({ businessPlaceId, parkingSpaceId, token }, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/parking/assign",
                { businessPlaceId, parkingSpaceId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Read (Get All Assigned Parking Spaces)
export const fetchAssignedParking = createAsyncThunk(
    "parking/fetchAssignedParking",
    async (token, { rejectWithValue }) => {
        try {
            const response = await api.get("/parking/assignments", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update (Modify Assigned Parking)
export const updateAssignedParking = createAsyncThunk(
    "parking/updateAssignedParking",
    async ({ id, businessPlaceId, parkingSpaceId, token }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `/parking/assign/${id}`,
                { businessPlaceId, parkingSpaceId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Delete (Remove Assigned Parking)
export const deleteAssignedParking = createAsyncThunk(
    "parking/deleteAssignedParking",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/parking/assign/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const parkingSlice = createSlice({
    name: "parking",
    initialState: {
        assignedParking: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Assigned Parking
            .addCase(fetchAssignedParking.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAssignedParking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.assignedParking = action.payload;
            })
            .addCase(fetchAssignedParking.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Assign Parking
            .addCase(assignParkingSpace.fulfilled, (state, action) => {
                state.assignedParking.push(action.payload);
            })

            // Update Assigned Parking
            .addCase(updateAssignedParking.fulfilled, (state, action) => {
                state.assignedParking = state.assignedParking.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                );
            })

            // Delete Assigned Parking
            .addCase(deleteAssignedParking.fulfilled, (state, action) => {
                state.assignedParking = state.assignedParking.filter(
                    (item) => item._id !== action.payload._id
                );
            });
    },
});

export default parkingSlice.reducer;
