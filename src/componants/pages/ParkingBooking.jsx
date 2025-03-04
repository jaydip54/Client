import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    TextField, Button, MenuItem, Select, FormControl, InputLabel,
    Dialog, DialogTitle, DialogContent, DialogActions, Typography, List, ListItem, ListItemText, Divider,
    Avatar
} from "@mui/material";
import { bookParking } from "../../redux/slices/ParkingBooking";

const ParkingBooking = () => {
    const dispatch = useDispatch();

    const { businessPlaces } = useSelector(state => state.businessPlace);
    console.log("🚀 ~ ParkingBooking ~ businessPlaces:", businessPlaces)
    const { vehicles } = useSelector(state => state.vehicle);
    console.log("🚀 ~ ParkingBooking ~ vehicles:", vehicles)
    const { spaces } = useSelector(state => state.parkingSpaces);
    const { bookings } = useSelector(state => state.bookings);
    console.log("🚀 ~ ParkingBooking ~ bookings:", bookings)
    const { token } = useSelector(state => state.auth)
    const [open, setOpen] = useState(false);
    const [bookingData, setBookingData] = useState({
        businessRegisterPlace: "",
        parkingSpace: "",
        vehicle: "",
        arrivalDate: "",
        leaveDate: "",
        amt: "",
        paymentMode: ""
    });

    const handleChange = (e) => {
        setBookingData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleBooking = () => {
        if (!bookingData.businessRegisterPlace || !bookingData.parkingSpace || !bookingData.vehicle ||
            !bookingData.arrivalDate || !bookingData.leaveDate || !bookingData.amt || !bookingData.paymentMode) {
            alert("All fields are required!");
            return;
        }

        const finalPayAmt = bookingData.amt;

        const bookingPayload = {
            ...bookingData,
            finalPayAmt,
            status: "Booked",
            statusPark: "Occupied"
        };

        dispatch(bookParking({ bookingPayload, token })).then(res => {
            if (res.meta.requestStatus === "fulfilled") {
                alert("Parking booked successfully!");
                setOpen(false);
            } else {
                alert("Booking failed. Try again.");
            }
        });
    };

    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Button to Open Booking Dialog */}
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Book Parking
            </Button>

            {/* Booking List */}
            <Typography variant="h6" sx={{ marginTop: 2 }}>
                Past Bookings
            </Typography>
            <List>
                {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                {/* User Avatar */}
                                <Avatar src={booking.user.propic} alt={booking.user.name} sx={{ marginRight: 2 }} />

                                <ListItemText
                                    primary={
                                        <>
                                            <Typography variant="subtitle1">
                                                Parking at <strong>{booking.businessRegisterPlace.placeName}</strong>
                                                ({booking.parkingSpace.name}) - <span style={{ color: "green" }}>{booking.status}</span>
                                            </Typography>
                                        </>
                                    }
                                    secondary={
                                        <>
                                            <Typography variant="body2">
                                                <strong>User:</strong> {booking.user.name} ({booking.user.contact})
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Vehicle:</strong> {booking.vehicle.name}
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Payment:</strong> ₹{booking.amt} via {booking.paymentMode}
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Arrival:</strong> {new Date(booking.arrivalDate).toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Leave:</strong> {new Date(booking.leaveDate).toLocaleString()}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))
                ) : (
                    <Typography>No previous bookings found.</Typography>
                )}
            </List>

            {/* Booking Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Book Parking</DialogTitle>
                <DialogContent>
                    {/* Business Place Selection */}
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Business Place</InputLabel>
                        <Select name="businessRegisterPlace" value={bookingData.businessRegisterPlace} onChange={handleChange}>
                            {businessPlaces.map(place => (
                                <MenuItem key={place._id} value={place._id}>{place.placeName}  <br />location - {place.location} <br /> price - {place.packageId.amount}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Parking Space Selection */}
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Parking Space</InputLabel>
                        <Select name="parkingSpace" value={bookingData.parkingSpace} onChange={handleChange}>
                            {spaces.map(space => (
                                <MenuItem key={space._id} value={space._id}>{space.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Vehicle Selection */}
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Vehicle</InputLabel>
                        <Select name="vehicle" value={bookingData.vehicle} onChange={handleChange}>
                            {vehicles.map(vehicle => (
                                <MenuItem key={vehicle._id} value={vehicle._id}>{vehicle.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Arrival & Leave Dates */}
                    <TextField name="arrivalDate" label="Arrival Date" type="datetime-local" fullWidth margin="dense" onChange={handleChange} />
                    <TextField name="leaveDate" label="Leave Date" type="datetime-local" fullWidth margin="dense" onChange={handleChange} />

                    {/* Booking Amount */}
                    <TextField name="amt" label="Amount" type="number" fullWidth margin="dense" onChange={handleChange} />

                    {/* Payment Mode Selection */}
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Payment Mode</InputLabel>
                        <Select name="paymentMode" value={bookingData.paymentMode} onChange={handleChange}>
                            {["Cash", "Card", "UPI"].map(mode => (
                                <MenuItem key={mode} value={mode}>{mode}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleBooking}>Book</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ParkingBooking;
