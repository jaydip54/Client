// Import necessary dependencies from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Import configuration and base URL
import { baseUrl } from "../../Atoms/constatnt";

// Define initial state for the ticket slice
let initialState = {
    ticket: [],
    isLoading: false,
    isError: null,
    updateError: null,
}

// Async thunk for fetching all tickets
export const getAllTickets = createAsyncThunk("ticket/get", async (payload, { rejectWithValue }) => {
    try {
        let { endpoint, token } = payload;
        console.log("🚀 ~ getAllTickets ~ endpoint:", endpoint)
        let response = await axios.get(baseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("🚀 ~ getAllTickets ~ response:", response.data.data)
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});


export const filterTickets = createAsyncThunk(
    "ticket/filter",
    async (payload, { rejectWithValue }) => {
        try {
            const { endpoint, token, query } = payload; // Destructure payload
            console.log("🚀 ~ filterTickets ~ query:", query);

            // Make the GET request to fetch filtered tickets
            const response = await axios.get(`${baseUrl}${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the headers
                },
                params: query // Pass the query parameters for filtering
            });

            // Log the response for debugging
            console.log("🚀 ~ filterTickets ~ response:", response.data);

            // Return the filtered tickets data
            return response.data.data;
        } catch (error) {
            // Log the error for debugging
            console.error("🚀 ~ filterTickets ~ error:", error?.response?.data?.message);

            // Return a rejected value with the error message
            return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
        }
    }
);

// Async thunk for adding a new ticket
export const addTicket = createAsyncThunk("ticket/post", async (payload, { rejectWithValue }) => {
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

// Async thunk for updating a ticket
export const updateTicket = createAsyncThunk("ticket/update", async (payload, { rejectWithValue }) => {
    try {
        let { data, endpoint, token } = payload;
        let response = await axios.put(baseUrl + endpoint + `/${data.ticketId}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'An error occurred');
    }
});

// Create the ticket slice
const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        clearTicket(state) {
            // Clear the ticket data upon logout
            state.ticket = [];
            state.isLoading = false;
            state.isError = null;
            state.updateError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle pending state for getAllTickets
            .addCase(getAllTickets.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.updateError = null;
            })
            // Handle successful state for getAllTickets
            .addCase(getAllTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.updateError = null;
                state.ticket = action.payload;
            })
            // Handle rejected state for getAllTickets
            .addCase(getAllTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.updateError = null;
                state.isError = action.payload;
            })
            // Handle pending state for filterTickets
            .addCase(filterTickets.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.updateError = null;
            })
            // Handle successful state for filterTickets
            .addCase(filterTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.updateError = null;
                state.ticket = action.payload; // Update ticket state with filtered tickets
            })
            // Handle rejected state for filterTickets
            .addCase(filterTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                state.updateError = null;
            })
            // Handle pending state for addTicket
            .addCase(addTicket.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.updateError = null;
            })
            // Handle successful state for addTicket
            .addCase(addTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.updateError = null;
                state.ticket = state.ticket.concat(action.payload);
            })
            // Handle rejected state for addTicket
            .addCase(addTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                state.updateError = null;
            })
            // Handle pending state for updateTicket
            .addCase(updateTicket.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.updateError = null;
            })
            // Handle successful state for updateTicket
            .addCase(updateTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.updateError = null;
                state.ticket = state.ticket.map(ticket => ticket._id === action.payload._id ? action.payload : ticket);
            })
            // Handle rejected state for updateTicket
            .addCase(updateTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
                state.updateError = action.payload;
            })
    }
});


export const { clearTicket } = ticketSlice.actions;
// Export the reducer
export default ticketSlice.reducer;
