import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Atoms/constatnt";

const API_URL = baseUrl; // Replace with actual API URL


// Fetch all packages
export const fetchPackages = createAsyncThunk("packages/fetchAll", async ({ token }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}package/`, {
            headers: { Authorization: `${token}` },
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error fetching packages");
    }
});

// Create a new package
export const createPackage = createAsyncThunk("packages/create", async ({ data, token }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}package/`, data, {
            headers: { Authorization: `${token}` },
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error creating package");
    }
});

// Delete a package
export const deletePackage = createAsyncThunk("packages/delete", async ({ id, token }, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}package/${id}`, {
            headers: { Authorization: `${token}` },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error deleting package");
    }
});

const packageSlice = createSlice({
    name: "packages",
    initialState: {
        packages: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPackages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPackages.fulfilled, (state, action) => {
                state.loading = false;
                state.packages = action.payload;
            })
            .addCase(fetchPackages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createPackage.fulfilled, (state, action) => {
                state.packages.push(action.payload);
            })
            .addCase(deletePackage.fulfilled, (state, action) => {
                state.packages = state.packages.filter((pkg) => pkg._id !== action.payload);
            });
    },
});

export default packageSlice.reducer;
