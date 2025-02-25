import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Atoms/constatnt";
import Cookies from 'js-cookie';

// Initial state
const initialState = {
    role: [],
    isLoading: false,
    isError: null
};

// Get all roles
export const getAllRoles = createAsyncThunk("role/get", async (payload, { rejectWithValue }) => {
    try {
        const { endpoint, token } = payload;
        const response = await axios.get(baseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Add role
export const addRole = createAsyncThunk("role/post", async (payload, { rejectWithValue }) => {
    try {
        const { data, endpoint, token } = payload;
        const response = await axios.post(baseUrl + endpoint, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Role slice
const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        clearRole(state) {
            state.role = [];
            state.isLoading = false;
            state.isError = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle getAllRoles
            .addCase(getAllRoles.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAllRoles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.role = action.payload;
            })
            .addCase(getAllRoles.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            // Handle addRole
            .addCase(addRole.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(addRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.role.push(action.payload);
            })
            .addCase(addRole.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            });
    }
});
export const { clearRole } = roleSlice.actions
export default roleSlice.reducer;
