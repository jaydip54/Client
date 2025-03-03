import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignParkingSpace, fetchParkingSpaces } from "../../redux/slices/parking";
import { fetchBusinessPlaces } from "../../redux/slices/bussinessPlace";
import {
    Box, Typography, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, MenuItem, CircularProgress
} from "@mui/material";

const ParkingAssignment = () => {
    const dispatch = useDispatch();
    const { businessPlaces, isLoading: businessLoading } = useSelector(state => state.businessPlace);
    const { parkingSpaces, isLoading: parkingLoading } = useSelector(state => state.parking);
    const { token } = useSelector(state => state.auth);

    const [openDialog, setOpenDialog] = useState(false);
    const [assignmentData, setAssignmentData] = useState({
        businessPlaceId: "",
        parkingSpaceId: "",
        assignedAt: new Date().toISOString()
    });

    useEffect(() => {
        if (token) {
            dispatch(fetchBusinessPlaces(token));
            dispatch(fetchParkingSpaces(token));
        }
    }, [dispatch, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssignmentData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveAssignment = () => {
        if (!token) return;
        dispatch(assignParkingSpace({ assignmentData, token }));
        handleCloseDialog();
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setAssignmentData({ businessPlaceId: "", parkingSpaceId: "", assignedAt: new Date().toISOString() });
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: "0 auto", paddingTop: "80px" }}>
            <Typography variant="h4">Assign Parking Space</Typography>
            {(businessLoading || parkingLoading) ? (
                <CircularProgress sx={{ mt: 2 }} />
            ) : (
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setOpenDialog(true)}>
                    Assign Parking
                </Button>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Assign Parking to Business</DialogTitle>
                <DialogContent>
                    <TextField select name="businessPlaceId" label="Business Place" fullWidth margin="dense"
                        value={assignmentData.businessPlaceId} onChange={handleInputChange}>
                        {businessPlaces.map(place => (
                            <MenuItem key={place._id} value={place._id}>{place.placeName}</MenuItem>
                        ))}
                    </TextField>
                    <TextField select name="parkingSpaceId" label="Parking Space" fullWidth margin="dense"
                        value={assignmentData.parkingSpaceId} onChange={handleInputChange}>
                        {parkingSpaces.map(space => (
                            <MenuItem key={space._id} value={space._id}>{space.name}</MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveAssignment} variant="contained">Assign</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ParkingAssignment;
