import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Atoms/constatnt";

const API_URL = `${baseUrl}/bussinesPlace`;

// Fetch business places
export const fetchBusinessPlaces = createAsyncThunk(
    "businessPlace/fetchBusinessPlaces",
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, {
                headers: { Authorization: `${token}` }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Add business place
export const addBusinessPlace = createAsyncThunk(
    "businessPlace/addBusinessPlace",
    async ({ businessData, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, businessData, {
                headers: { Authorization: `${token}` }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update business place
export const updateBusinessPlace = createAsyncThunk(
    "businessPlace/updateBusinessPlace",
    async ({ id, updatedData, token }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData, {
                headers: { Authorization: `${token}` }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete business place
export const deleteBusinessPlace = createAsyncThunk(
    "businessPlace/deleteBusinessPlace",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `${token}` }
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const businessPlaceSlice = createSlice({
    name: "businessPlace",
    initialState: {
        businessPlaces: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBusinessPlaces.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBusinessPlaces.fulfilled, (state, action) => {
                state.isLoading = false;
                state.businessPlaces = action.payload;
            })
            .addCase(fetchBusinessPlaces.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addBusinessPlace.fulfilled, (state, action) => {
                state.businessPlaces.push(action.payload);
            })
            .addCase(updateBusinessPlace.fulfilled, (state, action) => {
                const index = state.businessPlaces.findIndex(bp => bp._id === action.payload._id);
                if (index !== -1) {
                    state.businessPlaces[index] = action.payload;
                }
            })
            .addCase(deleteBusinessPlace.fulfilled, (state, action) => {
                state.businessPlaces = state.businessPlaces.filter(bp => bp._id !== action.payload);
            });
    }
});

export default businessPlaceSlice.reducer;
