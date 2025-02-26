// Import necessary dependencies from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// Import configuration and base URL
import { AddUserEndpoint, baseUrl, CommonUserEndpoint, GetUserEndpoint } from "../../Atoms/constatnt";

let initialState = {
    register: [],
    isLoading: false,
    isError: null
}

// Async thunk for registering a user
export const addUser = createAsyncThunk("register/post", async (payload, { rejectWithValue }) => {
    try {
        let { data } = payload;
        let response = await axios.post(baseUrl + AddUserEndpoint, data);
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Async thunk for getting user data
export const getUser = createAsyncThunk("register/get", async (_, { rejectWithValue }) => {
    try {
        let response = await axios.get(baseUrl + GetUserEndpoint);
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});


// Async thunk for deleting a user
export const deleteUser = createAsyncThunk("register/delete", async (userId, { rejectWithValue }) => {
    try {
        await axios.delete(`${baseUrl + CommonUserEndpoint}${userId}`);
        return userId;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Async thunk for updating a user
export const updateUser = createAsyncThunk("register/update", async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
        let response = await axios.put(`${baseUrl + CommonUserEndpoint}/${userId}`, updatedData);
        return response.data.data;
    } catch (error) {
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

    }


})
console.log(initialState.register);
export const { clearUsers } = registerSlice.actions
export default registerSlice.reducer;
