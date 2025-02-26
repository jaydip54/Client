import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, cityEndpoint } from '../../Atoms/constatnt';


// Async actions for CRUD operations

// Fetch all cities
export const fetchCities = createAsyncThunk('city/fetchCities', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(baseUrl + cityEndpoint);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Add a new city
export const addCity = createAsyncThunk('city/addCity', async (cityData, { rejectWithValue }) => {
    try {
        const response = await axios.post(baseUrl + cityEndpoint, cityData);
        return response.data.updateCity;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Update a city
export const updateCity = createAsyncThunk('city/updateCity', async ({ id, updatedData }, { rejectWithValue }) => {
    console.log("🚀 ~ updateCity ~ updatedData:", updatedData)
    console.log("🚀 ~ updateCity ~ id:", id)
    try {
        const response = await axios.put(`${baseUrl + cityEndpoint}${id}`, updatedData);
        return response.data;
        console.log("🚀 ~ updateCity ~ response:", response)
        console.log("🚀 ~ updateCity ~ response:", response)
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Delete a city
export const deleteCity = createAsyncThunk('city/deleteCity', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${baseUrl + cityEndpoint}${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// City Slice
const citySlice = createSlice({
    name: 'city',
    initialState: {
        cities: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cities = action.payload;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addCity.fulfilled, (state, action) => {
                state.cities.push(action.payload);
            })
            .addCase(updateCity.fulfilled, (state, action) => {
                state.cities = state.cities.map(city =>
                    city._id === action.payload._id ? action.payload : city
                );
            })
            .addCase(deleteCity.fulfilled, (state, action) => {
                state.cities = state.cities.filter(city => city._id !== action.payload);
            });
    }
});

export default citySlice.reducer;
