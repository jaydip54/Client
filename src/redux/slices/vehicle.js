import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Atoms/constatnt";

const API_URL = `${baseUrl}vehicle`; // Replace with actual API endpoint

// Async Thunks
export const fetchVehicles = createAsyncThunk("vehicle/fetchVehicles", async (token, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `${token}` }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const addVehicle = createAsyncThunk("vehicle/addVehicle", async ({ vehicleData, token }, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, vehicleData, {
            headers: { Authorization: `${token}` }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const updateVehicle = createAsyncThunk("vehicle/updateVehicle", async ({ id, updatedData, token }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData, {
            headers: { Authorization: `${token}` }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const deleteVehicle = createAsyncThunk("vehicle/deleteVehicle", async ({ id, token }, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `${token}` }
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Slice
const vehicleSlice = createSlice({
    name: "vehicle",
    initialState: {
        vehicles: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicles.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.vehicles = action.payload;
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addVehicle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addVehicle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.vehicles.push(action.payload);
            })
            .addCase(addVehicle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateVehicle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                console.log("🚀 ~ .addCase ~ action:", action.payload)
                state.isLoading = false;
                state.vehicles = state.vehicles.map(veh =>
                    veh._id === action.payload._id ? action.payload : veh
                );
            })
            .addCase(updateVehicle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteVehicle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.vehicles = state.vehicles.filter(v => v._id !== action.payload);
            })
            .addCase(deleteVehicle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default vehicleSlice.reducer;