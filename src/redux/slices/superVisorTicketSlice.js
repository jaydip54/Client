// Import necessary dependencies from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Import configuration for the base URL
import { baseUrl } from "../../Atoms/constatnt";

// Initial state for different ticket categories
let initialState = {
    personalticket: {
        ticket: [], // Array of personal tickets
        isLoading: false, // Loading state
        isError: null, // Error state
    },
    departmentticket: {
        ticket: [], // Array of department tickets
        isLoading: false,
        isError: null,
    },
    assignedfalseticket: {
        ticket: [], // Tickets with assigned false
        isLoading: false,
        isError: null,
    },
    assignedtrueticket: {
        ticket: [], // Tickets with assigned true
        isLoading: false,
        isError: null,
    }
}

// Async thunk to add a ticket
export const addTicket = createAsyncThunk("ticket/add", async (payload, { rejectWithValue }) => {
    try {
        const { data, endpoint, token } = payload;
        const response = await axios.post(baseUrl + endpoint, data, {
            headers: {
                'Authorization': `Bearer ${token}` // Passing the token in header
            }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Async thunk to fetch personal tickets
export const getPersonalTickets = createAsyncThunk("ticket/getPersonal", async (payload, { rejectWithValue }) => {
    try {
        const { endpoint, token } = payload;
        const response = await axios.get(baseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${token}` // Passing the token in header
            }
        });
        return response.data.data; // Return ticket data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Async thunk to fetch department tickets
export const getDepartmentTickets = createAsyncThunk("ticket/getDepartment", async (payload, { rejectWithValue }) => {
    try {
        const { endpoint, token } = payload;
        const response = await axios.get(baseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${token}` // Passing the token in header
            }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Async thunk to fetch tickets with assigned false
export const getAssignFalseTickets = createAsyncThunk("ticket/getAssignFalse", async (payload, { rejectWithValue }) => {
    try {
        const { endpoint, token } = payload;
        const response = await axios.get(baseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${token}` // Passing the token in header
            }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Async thunk to fetch tickets with assigned true
export const getAssignTrueTickets = createAsyncThunk("ticket/getAssignTrue", async (payload, { rejectWithValue }) => {
    try {
        const { endpoint, token } = payload;
        const response = await axios.get(baseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${token}` // Passing the token in header
            }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Creating the ticket slice
const ticketSlice = createSlice({
    name: "ticket", // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        // Reducer to clear all ticket data
        clearTickets(state) {
            state.personalticket.ticket = [];
            state.departmentticket.ticket = [];
            state.assignedfalseticket.ticket = [];
            state.assignedtrueticket.ticket = [];
            state.personalticket.isLoading = false;
            state.departmentticket.isLoading = false;
            state.assignedfalseticket.isLoading = false;
            state.assignedtrueticket.isLoading = false;
            state.personalticket.isError = null;
            state.departmentticket.isError = null;
            state.assignedfalseticket.isError = null;
            state.assignedtrueticket.isError = null;
        },
    },
    extraReducers: (builder) => {
        // Handling different states for fetching tickets (pending, fulfilled, rejected)
        builder
            .addCase(getPersonalTickets.pending, (state) => {
                state.personalticket.isLoading = true;
                state.personalticket.isError = null;
            })
            .addCase(getPersonalTickets.fulfilled, (state, action) => {
                state.personalticket.isLoading = false;
                state.personalticket.isError = null;
                state.personalticket.ticket = action.payload;
            })
            .addCase(getPersonalTickets.rejected, (state, action) => {
                state.personalticket.isLoading = false;
                state.personalticket.isError = action.payload;
            })
            .addCase(getDepartmentTickets.pending, (state) => {
                state.departmentticket.isLoading = true;
                state.departmentticket.isError = null;
            })
            .addCase(getDepartmentTickets.fulfilled, (state, action) => {
                state.departmentticket.isLoading = false;
                state.departmentticket.isError = null;
                state.departmentticket.ticket = action.payload;
            })
            .addCase(getDepartmentTickets.rejected, (state, action) => {
                state.departmentticket.isLoading = false;
                state.departmentticket.isError = action.payload;
            })
            .addCase(getAssignFalseTickets.pending, (state) => {
                state.assignedfalseticket.isLoading = true;
                state.assignedfalseticket.isError = null;
            })
            .addCase(getAssignFalseTickets.fulfilled, (state, action) => {
                state.assignedfalseticket.isLoading = false;
                state.assignedfalseticket.isError = null;
                state.assignedfalseticket.ticket = action.payload;
            })
            .addCase(getAssignFalseTickets.rejected, (state, action) => {
                state.assignedfalseticket.isLoading = false;
                state.assignedfalseticket.isError = action.payload;
            })
            .addCase(getAssignTrueTickets.pending, (state) => {
                state.assignedtrueticket.isLoading = true;
                state.assignedtrueticket.isError = null;
            })
            .addCase(getAssignTrueTickets.fulfilled, (state, action) => {
                state.assignedtrueticket.isLoading = false;
                state.assignedtrueticket.isError = null;
                state.assignedtrueticket.ticket = action.payload;
            })
            .addCase(getAssignTrueTickets.rejected, (state, action) => {
                state.assignedtrueticket.isLoading = false;
                state.assignedtrueticket.isError = action.payload;
            })
            .addCase(addTicket.pending, (state) => {
                state.personalticket.isLoading = true;
                state.personalticket.isError = null;
            })
            .addCase(addTicket.fulfilled, (state, action) => {
                state.personalticket.isLoading = false;
                state.personalticket.isError = null;
                state.personalticket.ticket = [...state.personalticket.ticket, action.payload];
            })
            .addCase(addTicket.rejected, (state, action) => {
                state.personalticket.isLoading = false;
                state.personalticket.isError = action.payload;
            });
    }
});

// Export the clearTickets action for clearing ticket data
export const { clearTickets } = ticketSlice.actions;

// Export the reducer to be used in the store
export default ticketSlice.reducer;
