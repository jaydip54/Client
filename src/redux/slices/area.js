import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { areaEndpoint, baseUrl } from "../../Atoms/constatnt";

// Fetch all areas
export const fetchAreas = createAsyncThunk("area/fetchAreas", async () => {
    const response = await axios.get(baseUrl + areaEndpoint);
    return response.data.areas;
});

// Add a new area
export const addArea = createAsyncThunk("area/addArea", async (area) => {
    const response = await axios.post(baseUrl + areaEndpoint, area);
    return response.data.area;
});

// Update an existing area
export const updateArea = createAsyncThunk("area/updateArea", async (area) => {
    const response = await axios.put(`${baseUrl + areaEndpoint}${area._id}`, area);
    return response.data.area;
});

// Delete an area
export const deleteArea = createAsyncThunk("area/deleteArea", async (id) => {
    await axios.delete(`${baseUrl + areaEndpoint}${id}`);
    return id;
});

const areaSlice = createSlice({
    name: "area",
    initialState: {
        areas: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAreas.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAreas.fulfilled, (state, action) => {
                state.loading = false;
                state.areas = action.payload;
            })
            .addCase(fetchAreas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addArea.fulfilled, (state, action) => {
                state.areas.push(action.payload);
            })
            .addCase(updateArea.fulfilled, (state, action) => {
                state.areas = state.areas.map(area =>
                    area._id === action.payload._id ? action.payload : area
                );
            })
            .addCase(deleteArea.fulfilled, (state, action) => {
                state.areas = state.areas.filter(area => area._id !== action.payload);
            });
    },
});

export default areaSlice.reducer;
