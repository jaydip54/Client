import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Atoms/constatnt";

let initialState = {
    token: null,
    isLoading: false,
    isError: null,
    status: false,
    type: null,

    resetPassword: {
        error: null,
        successMessage: null,
        isLoading: false,
    },

    sendOtp: {
        error: null,
        successMessage: null,
        isLoading: false,
    },

    verifyOtp: {
        error: null,
        successMessage: null,
        isLoading: false,
    },

    changePassword: {
        error: null,
        successMessage: null,
        isLoading: false,
    },
};

// 1. Login API
export const loginapi = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
    try {
        const { data, endpoint } = payload;
        const response = await axios.post(`${baseUrl}${endpoint}`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// 2. Reset Password API
export const ResetPasswordApi = createAsyncThunk("auth/reset_password", async (payload, { rejectWithValue }) => {
    try {
        const { data, endpoint, token } = payload;
        const response = await axios.post(`${baseUrl}${endpoint}`, data, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// 3. Send OTP API
export const SendOtpApi = createAsyncThunk("auth/send_otp", async (payload, { rejectWithValue }) => {
    try {
        const { data, endpoint } = payload;
        console.log("🚀 ~ SendOtpApi ~ data:", data)
        const response = await axios.post(`${baseUrl}${endpoint}`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// 4. Verify OTP API
export const VerifyOtpApi = createAsyncThunk("auth/verify_otp", async (payload, { rejectWithValue }) => {
    try {
        const { data, endpoint } = payload;
        console.log("🚀 ~ VerifyOtpApi ~ data:", data)
        const response = await axios.post(`${baseUrl}${endpoint}`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// 5. Change Password API
export const ChangePasswordApi = createAsyncThunk("auth/change_password", async (payload, { rejectWithValue }) => {
    try {
        const { data, endpoint } = payload;
        console.log("🚀 ~ ChangePasswordApi ~ endpoint:", endpoint)
        console.log("🚀 ~ ChangePasswordApi ~ data:", data)
        const response = await axios.post(`${baseUrl}${endpoint}`, data);
        console.log(response.data.message);

        return response.data;
    } catch (error) {
        console.log(error?.response?.data?.message || error.message);

        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

let authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.status = false;
            state.token = null;
            state.type = null;
            state.resetPassword.successMessage = null;
            state.resetPassword.error = null;
            state.sendOtp.successMessage = null;
            state.sendOtp.error = null;
            state.verifyOtp.successMessage = null;
            state.verifyOtp.error = null;
            state.changePassword.successMessage = null;
            state.changePassword.error = null;
        },
        clearMessageAfterResetPassword(state) {
            state.resetPassword.successMessage = null;
            state.resetPassword.error = null;
            state.resetPassword.isLoading = false;
        },
        clearOtpMessage(state) {
            // Clear OTP related messages and loading states
            state.sendOtp.successMessage = null;       // Clear success message for sending OTP
            state.sendOtp.error = null;                 // Clear error message for sending OTP
            state.sendOtp.isLoading = false;            // Reset loading state to false for send OTP
        },
        clearVerifyOtpMessage(state) {
            // Clear Verify OTP related messages and loading states
            state.verifyOtp.successMessage = null;     // Clear success message for verifying OTP
            state.verifyOtp.error = null;               // Clear error message for verifying OTP
            state.verifyOtp.isLoading = false;          // Reset loading state to false for verifying OTP
        },
        clearChangePasswordMessage(state) {
            // Clear Change Password related messages and loading states
            state.changePassword.successMessage = null; // Clear success message for changing password
            state.changePassword.error = null;           // Clear error message for changing password
            state.changePassword.isLoading = false;      // Reset loading state to false for changing password
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginapi.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.token = null;
                state.type = null;
            })
            .addCase(loginapi.fulfilled, (state, action) => {
                state.isError = null;
                state.isLoading = false;
                state.token = action.payload.token;
                state.type = action.payload.type;
            })
            .addCase(loginapi.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(ResetPasswordApi.pending, (state) => {
                state.resetPassword.isLoading = true;
                state.resetPassword.error = null;
                state.resetPassword.successMessage = null;
            })
            .addCase(ResetPasswordApi.fulfilled, (state, action) => {
                state.resetPassword.isLoading = false;
                state.resetPassword.error = null;
                state.resetPassword.successMessage = action.payload.message;
            })
            .addCase(ResetPasswordApi.rejected, (state, action) => {
                state.resetPassword.isLoading = false;
                state.resetPassword.successMessage = null;
                state.resetPassword.error = action.payload;
            })
            .addCase(SendOtpApi.pending, (state) => {
                state.sendOtp.isLoading = true;
                state.sendOtp.error = null;
                state.sendOtp.successMessage = null;
            })
            .addCase(SendOtpApi.fulfilled, (state, action) => {
                state.sendOtp.isLoading = false;
                state.sendOtp.error = null;
                state.sendOtp.successMessage = action.payload.message;
            })
            .addCase(SendOtpApi.rejected, (state, action) => {
                state.sendOtp.isLoading = false;
                state.sendOtp.successMessage = null;
                state.sendOtp.error = action.payload;
            })
            // Add cases for VerifyOtpApi and ChangePasswordApi as well
            // Example for VerifyOtpApi
            .addCase(VerifyOtpApi.pending, (state) => {
                state.verifyOtp.isLoading = true;
                state.verifyOtp.error = null;
                state.verifyOtp.successMessage = null;
            })
            .addCase(VerifyOtpApi.fulfilled, (state, action) => {
                state.verifyOtp.isLoading = false;
                state.verifyOtp.error = null;
                state.verifyOtp.successMessage = action.payload.message;
            })
            .addCase(VerifyOtpApi.rejected, (state, action) => {
                state.verifyOtp.isLoading = false;
                state.verifyOtp.successMessage = null;
                state.verifyOtp.error = action.payload;
            })
            // Example for ChangePasswordApi
            .addCase(ChangePasswordApi.pending, (state) => {
                state.changePassword.isLoading = true;
                state.changePassword.error = null;
                state.changePassword.successMessage = null;
            })
            .addCase(ChangePasswordApi.fulfilled, (state, action) => {
                state.changePassword.isLoading = false;
                state.changePassword.error = null;
                state.changePassword.successMessage = action.payload.message;
            })
            .addCase(ChangePasswordApi.rejected, (state, action) => {
                state.changePassword.isLoading = false;
                state.changePassword.successMessage = null;
                state.changePassword.error = action.payload;
            });
    },
});

// Export actions and reducer
export const {
    logout,
    clearMessageAfterResetPassword,
    clearOtpMessage,
    clearVerifyOtpMessage,
    clearChangePasswordMessage
} = authSlice.actions;

export default authSlice.reducer;
