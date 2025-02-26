import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, loginHistoryEndpoint } from "../../Atoms/constatnt";

const API_URL = baseUrl + loginHistoryEndpoint;

// Fetch all login records
export const fetchAllLoginHistory = createAsyncThunk(
    "loginHistory/fetchAll",
    async ({ token }) => {
        const response = await axios.get(`${API_URL}/getall`, {
            headers: { Authorization: `${token}` },
        });
        return response.data.logins;
    }
);

// Fetch login records for a specific user
export const fetchLoginHistoryByUser = createAsyncThunk(
    "loginHistory/fetchByUser",
    async ({ userId, token }) => {
        const response = await axios.get(`${API_URL}${userId}`, {
            headers: { Authorization: `${token}` },
        });
        console.log("🚀 ~ response:", response)
        return response.data.login;
    }
);

export const fetchLoginHistoryByUserLogin = createAsyncThunk(
    "loginHistory/fetchByUserLogin",
    async ({ token }) => {
        const response = await axios.get(`${API_URL}`, {
            headers: { Authorization: `${token}` },
        });
        console.log("🚀 ~ response:", response)
        return response.data.logins;
    }
);

// Delete a login record
export const deleteLoginHistory = createAsyncThunk(
    "loginHistory/delete",
    async ({ id, token }) => {
        await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `${token}` },
        });
        return id;
    }
);

const loginHistorySlice = createSlice({
    name: "loginHistory",
    initialState: {
        history: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLoginHistory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllLoginHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.history = action.payload;
            })
            .addCase(fetchAllLoginHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchLoginHistoryByUser.fulfilled, (state, action) => {
                state.history = action.payload;
            })
            .addCase(deleteLoginHistory.fulfilled, (state, action) => {
                state.history = state.history.filter(record => record._id !== action.payload);
            })
            .addCase(deleteLoginHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchLoginHistoryByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchLoginHistoryByUserLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLoginHistoryByUserLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.history = action.payload;
            })
            .addCase(fetchLoginHistoryByUserLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


    },
});

export default loginHistorySlice.reducer;
