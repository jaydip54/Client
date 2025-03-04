import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Atoms/constatnt";

const API_URL = `${baseUrl}book`;

// 🚀 Book a Parking Space
export const bookParking = createAsyncThunk(
    "booking/book",
    async ({ bookingPayload, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}`, bookingPayload,
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            );
            return response.data.booking;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 🚀 Fetch All Bookings for a User
export const fetchBookings = createAsyncThunk(
    "booking/fetchlogin",
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/loginuser`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchBookingsAll = createAsyncThunk(
    "booking/fetchAll",
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            console.log("sfbhjwehfhebrireujheri", response.data);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchBookingsAllPlaceOwner = createAsyncThunk(
    "booking/fetchAllplaceOwner",
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/placeowner`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            console.log("sfbhjwehfhebrireujheri", response.data);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// 🚀 Cancel a Booking
export const cancelBooking = createAsyncThunk(
    "booking/cancel",
    async ({ bookingId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/cancel/${bookingId}`);
            return response.data.updatedBooking;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 🚀 Fetch Bank Details for Payment
export const fetchBanks = createAsyncThunk(
    "booking/fetchBanks",
    async (cityId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}bank/city/${cityId}`);
            return response.data.banks;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const bookingSlice = createSlice({
    name: "booking",
    initialState: { bookings: [], banks: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Book Parking
            .addCase(bookParking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bookParking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings.push(action.payload);
            })
            .addCase(bookParking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Bookings
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchBookingsAll.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchBookingsAllPlaceOwner.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Cancel Booking
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.bookings = state.bookings.map((booking) =>
                    booking._id === action.payload._id ? action.payload : booking
                );
            })

            // Fetch Banks
            .addCase(fetchBanks.fulfilled, (state, action) => {
                state.banks = action.payload;
            });
    },
});

export default bookingSlice.reducer;
