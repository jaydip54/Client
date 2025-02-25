import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Atoms/constatnt";


// Initial state
let initialState = {
    department: [],
    isLoading: false,
    isError: null
};

// Get all departments
export const getAllDepartments = createAsyncThunk("department/get", async (payload, { rejectWithValue }) => {
    try {
        let { endpoint, token } = payload
        let response = await axios.get(baseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // console.log("🚀 ~ getAllDepartments ~ response:", response.data.data)
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Add department
export const addDepartment = createAsyncThunk("department/post", async (payload, { rejectWithValue }) => {
    try {
        let { data, endpoint, token } = payload;
        let response = await axios.post(baseUrl + endpoint, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Department slice
const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        clearDepartment(state) {
            state.department = [];
            state.isLoading = false;
            state.isError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle getAllDepartments
            .addCase(getAllDepartments.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAllDepartments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.department = action.payload;
            })
            .addCase(getAllDepartments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            // Handle addDepartment
            .addCase(addDepartment.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(addDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.department = state.department.concat(action.payload)
            })
            .addCase(addDepartment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
    }
});
export const { clearDepartment } = departmentSlice.actions
export default departmentSlice.reducer;
