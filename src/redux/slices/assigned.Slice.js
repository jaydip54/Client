import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../Atoms/constatnt";
import axios from "axios";
import { useSelector } from "react-redux";



let initialState = {
    assigned: [],
    isLoading: false,
    isError: null,
}




export const getAssignedTickets = createAsyncThunk("assignedTickets/get", async (payload, { rejectWithValue }) => {
    try {
        let { endpoint, token,
            // page 
        } = payload;
        let response = await axios.get(baseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            // params: {
            //     page: page
            // }
        });
        console.log("🚀 ~ getAssignedTickets ~ response:", response.data)
        return response.data.data;

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

export const AddAssignedTickets = createAsyncThunk('assignedTickets/add', async (payload, { rejectWithValue }) => {
    try {
        let { endpoint, token, data } = payload;
        let response = await axios.post(baseUrl + endpoint, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("��� ~ AddAssignedTickets ~ response:", response.data.data)
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
})



const assignedSlice = createSlice({
    name: "assignedTickets",
    initialState,
    reducers: {
        clearAssignedTickets(state) {
            state.assigned = [];
            state.isLoading = false;
            state.isError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAssignedTickets.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAssignedTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.assigned = action.payload;
            })
            .addCase(getAssignedTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(AddAssignedTickets.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(AddAssignedTickets.fulfilled, (state, action) => {
                console.log("🚀 ~ .addCase ~ action:", action)
                state.isLoading = false;
                state.isError = null;
                state.assigned = state.assigned.concat(action.payload);
            })
            .addCase(AddAssignedTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })

    }
});



export const { clearAssignedTickets } = assignedSlice.actions;

export default assignedSlice.reducer;

