import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addVehicle,
    updateVehicle,
    deleteVehicle,
    fetchVehicles
} from "../../redux/slices/vehicle";

import {
    Box, Typography, List, ListItem, IconButton, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, MenuItem, CircularProgress
} from "@mui/material";

import { Delete, Edit, Add } from "@mui/icons-material";

const VehicleManagement = () => {
    const dispatch = useDispatch();
    const { vehicles, isLoading, error } = useSelector((state) => state.vehicle);
    console.log("🚀 ~ VehicleManagement ~ error:", error)
    const { token } = useSelector((state) => state.auth);

    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [vehicleData, setVehicleData] = useState({ name: "" });

    useEffect(() => {
        dispatch(fetchVehicles(token));
    }, [dispatch, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVehicleData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveVehicle = async () => {
        if (!token) return;

        if (editMode) {
            dispatch(updateVehicle({ id: selectedVehicleId, updatedData: vehicleData, token }));
        } else {
            dispatch(addVehicle({ vehicleData, token }));
        }

        handleCloseDialog();
    };

    const handleEditVehicle = (vehicle) => {
        setVehicleData({ ...vehicle });
        setSelectedVehicleId(vehicle._id);
        setEditMode(true);
        setOpenDialog(true);
    };

    const handleDeleteVehicle = (id) => {
        if (!token) return;

        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            dispatch(deleteVehicle({ id, token }));
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditMode(false);
        setSelectedVehicleId(null);
        setVehicleData({ name: "" });
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: "0 auto", paddingTop: "80px" }}>
            <Typography variant="h4">Vehicle Management</Typography>

            {isLoading ? (
                <CircularProgress sx={{ mt: 2 }} />
            ) : error ? (
                <Typography color="error" sx={{ mt: 2 }}>{error.error}</Typography>
            ) : (
                <List sx={{ mt: 2 }}>
                    {vehicles.map((vehicle) => (
                        <ListItem key={vehicle._id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography variant="h6">{vehicle.name}</Typography>
                            </Box>
                            <Box>
                                <IconButton color="primary" onClick={() => handleEditVehicle(vehicle)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => handleDeleteVehicle(vehicle._id)}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}

            <Button variant="contained" color="primary" startIcon={<Add />} sx={{ mt: 2 }} onClick={() => setOpenDialog(true)}>
                Add Vehicle
            </Button>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editMode ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Vehicle Name"
                        fullWidth
                        margin="dense"
                        value={vehicleData.name}
                        onChange={handleInputChange}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveVehicle} variant="contained">
                        {editMode ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default VehicleManagement;