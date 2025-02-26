import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, } from "../../Atoms/constatnt";

let initialState = {
    profile: null,
    isLoading: false,
    isError: null
}

export const getProfile = createAsyncThunk("profile/get", async (payload, { rejectWithValue }) => {
    try {
        let response = await axios.get(`${baseUrl}${payload.endpoint}`, {
            headers: {
                'Authorization': `${payload.token}`
            }
        })
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
})

let profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearProfile(state) {
            state.profile = null;
            state.isLoading = false;
            state.isError = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.profile = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
    }
})
export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer;
