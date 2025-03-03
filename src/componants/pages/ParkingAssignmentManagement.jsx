import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Box, Typography, List, ListItem, IconButton, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, CircularProgress
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import { addParkingAssignment, deleteParkingAssignment, updateParkingAssignment } from "../../redux/slices/assign";

const ParkingAssignmentManagement = () => {
    const dispatch = useDispatch();
    const { assignments, isLoading, error } = useSelector(state => state.parkingAssignment);
    const { token } = useSelector(state => state.auth);
    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
    const [assignmentData, setAssignmentData] = useState({ businessPlaceId: "", parkingSpaceId: "" });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssignmentData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveAssignment = () => {
        if (!token) return;
        if (editMode) {
            dispatch(updateParkingAssignment({ id: selectedAssignmentId, updatedData: assignmentData, token }));
        } else {
            dispatch(addParkingAssignment({ ...assignmentData, token }));
        }
        handleCloseDialog();
    };

    const handleEditAssignment = (assignment) => {
        setAssignmentData({ businessPlaceId: assignment.businessPlaceId, parkingSpaceId: assignment.parkingSpaceId });
        setSelectedAssignmentId(assignment._id);
        setEditMode(true);
        setOpenDialog(true);
    };

    const handleDeleteAssignment = (id) => {
        if (!token) return;
        if (window.confirm("Are you sure you want to delete this assignment?")) {
            dispatch(deleteParkingAssignment({ id, token }));
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditMode(false);
        setSelectedAssignmentId(null);
        setAssignmentData({ businessPlaceId: "", parkingSpaceId: "" });
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: "0 auto", paddingTop: "80px" }}>
            <Typography variant="h4">Parking Assignments</Typography>
            {isLoading ? (
                <CircularProgress sx={{ mt: 2 }} />
            ) : error ? (
                <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
            ) : (
                <List sx={{ mt: 2 }}>
                    {assignments.map(assignment => (
                        <ListItem key={assignment._id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography>Business Place: {assignment.businessPlaceId}</Typography>
                                <Typography>Parking Space: {assignment.parkingSpaceId}</Typography>
                                <Typography>Assigned At: {new Date(assignment.assignedAt).toLocaleString()}</Typography>
                            </Box>
                            <Box>
                                <IconButton color="primary" onClick={() => handleEditAssignment(assignment)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => handleDeleteAssignment(assignment._id)}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}

            <Button variant="contained" color="primary" startIcon={<Add />} sx={{ mt: 2 }} onClick={() => setOpenDialog(true)}>
                Assign Parking Space
            </Button>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editMode ? "Edit Assignment" : "Assign Parking Space"}</DialogTitle>
                <DialogContent>
                    <TextField name="businessPlaceId" label="Business Place ID" fullWidth margin="dense" value={assignmentData.businessPlaceId} onChange={handleInputChange} />
                    <TextField name="parkingSpaceId" label="Parking Space ID" fullWidth margin="dense" value={assignmentData.parkingSpaceId} onChange={handleInputChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveAssignment} variant="contained">{editMode ? "Update" : "Assign"}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ParkingAssignmentManagement;
