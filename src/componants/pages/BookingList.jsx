import React from "react";
import { useSelector } from "react-redux";
import { Typography, List, ListItem, ListItemText, Avatar, Divider } from "@mui/material";

const BookingList = () => {
    const { bookings } = useSelector(state => state.bookings);

    return (
        <div>
            <Typography variant="h6" sx={{ marginTop: 2, paddingTop:'80px'}}>
                All Bookings
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
        </div>
    );
};

export default BookingList;
