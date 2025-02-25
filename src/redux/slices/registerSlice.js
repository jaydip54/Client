// Import necessary dependencies from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// Import configuration and base URL
import { baseUrl } from "../../Atoms/constatnt";

// Define initial state for the register slice
let initialState = {
    register: [],
    technicianDepartment: [],
    isLoading: false,
    isError: null
}

// Async thunk for registering a user
export const addUser = createAsyncThunk("register/post", async (payload, { rejectWithValue }) => {
    try {
        let { data, endpoint, token } = payload;
        let response = await axios.post(baseUrl + endpoint, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Async thunk for getting user data
export const getUser = createAsyncThunk("register/get", async (payload, { rejectWithValue }) => {
    try {
        let { endpoint, token } = payload;
        let response = await axios.get(baseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // console.log("🚀 ~ getUser ~ response:", response.data.data)
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

export const getUser_SuperVisor_Department = createAsyncThunk("register/getdepartment", async (payload, { rejectWithValue }) => {
    try {
        let { endpoint, token } = payload;
        let response = await axios.get(baseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // console.log("🚀 ~ getUser ~ response:", response.data.data)
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

export const getUser_SuperVisor_Department_technician = createAsyncThunk("register/getdepartment_technician", async (payload, { rejectWithValue }) => {
    try {
        let { endpoint, token } = payload;
        let response = await axios.get(baseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // console.log("🚀 ~ getUser ~ response:", response.data.data)
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});


// Create the register slice
export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        clearUsers(state) {
            state.register = [];
            state.isError = null;
            state.isLoading = false;
            state.technicianDepartment = [];
        }


    },
    extraReducers: (builder) => {
        builder
            // Handle pending state for register
            .addCase(addUser.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            // Handle successful state for register
            .addCase(addUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.register = state.register.concat(action.payload);
            })
            // Handle rejected state for register
            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            // Handle pending state for getUser
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            // Handle successful state for getUser
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.register = action.payload;
            })
            // Handle rejected state for getUser
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            // Handle pending state for getUser_SuperVisor_Department
            .addCase(getUser_SuperVisor_Department.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            // Handle successful state for getUser_SuperVisor_Department
            .addCase(getUser_SuperVisor_Department.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.register = action.payload;
            })
            // Handle rejected state for getUser_Supervisor_Department
            .addCase(getUser_SuperVisor_Department.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            // Handle pending state for getUser_SuperVisor_Department_technician
            .addCase(getUser_SuperVisor_Department_technician.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            // Handle successful state for getUser_SuperVisor_Department_technician
            .addCase(getUser_SuperVisor_Department_technician.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.technicianDepartment = action.payload;
            })
            // Handle rejected state for getUser_Supervisor_Department_technician
            .addCase(getUser_SuperVisor_Department_technician.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
    }
})
export const { clearUsers } = registerSlice.actions
export default registerSlice.reducer;
