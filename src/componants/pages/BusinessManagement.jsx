import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBusinessPlaces,
    addBusinessPlace,
    updateBusinessPlace,
    deleteBusinessPlace
} from "../../redux/slices/bussinessPlace";
import {
    Box, Typography, List, ListItem, IconButton, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, CircularProgress, MenuItem, Checkbox, FormControlLabel
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";

const BusinessPlaceManagement = () => {
    const dispatch = useDispatch();
    const { businessPlaces, isLoading, error } = useSelector(state => state.businessPlace);
    const { type, token } = useSelector(state => state.auth); // Get user type & token
    const { cities, packages, vehicles, areas, categories } = useSelector(state => ({
        cities: state.city.cities,
        packages: state.packages.packages,
        vehicles: state.vehicle.vehicles,
        areas: state.area.areas,
        categories: state.category.categories,
    }));

    const isAdmin = type === 1; // Only type === 1 users can modify

    useEffect(() => {
        if (token) dispatch(fetchBusinessPlaces(token));
    }, [dispatch, token]);

    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedBusinessPlaceId, setSelectedBusinessPlaceId] = useState(null);
    const [businessPlaceData, setBusinessPlaceData] = useState({
        placeName: "", address: "", placeEmailId: "", contact: "", location: "", city: "",
        packageId: "", vehicleId: "", areaId: "", categoryId: "", over: false, activeStatus: true,
        activeDate: "", deactiveDate: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBusinessPlaceData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setBusinessPlaceData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSaveBusinessPlace = () => {
        if (!token || !isAdmin) return;
        if (editMode) {
            dispatch(updateBusinessPlace({ id: selectedBusinessPlaceId, updatedData: businessPlaceData, token }));
        } else {
            dispatch(addBusinessPlace({ businessData: businessPlaceData, token }));
        }
        handleCloseDialog();
    };

    const handleEditBusinessPlace = (place) => {
        if (!isAdmin) return;
        setBusinessPlaceData({ ...place });
        setSelectedBusinessPlaceId(place._id);
        setEditMode(true);
        setOpenDialog(true);
    };

    const handleDeleteBusinessPlace = (id) => {
        if (!token || !isAdmin) return;
        if (window.confirm("Are you sure you want to delete this business place?")) {
            dispatch(deleteBusinessPlace({ id, token }));
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditMode(false);
        setSelectedBusinessPlaceId(null);
        setBusinessPlaceData({
            placeName: "", address: "", placeEmailId: "", contact: "", location: "", city: "",
            packageId: "", vehicleId: "", areaId: "", categoryId: "", over: false, activeStatus: true,
            activeDate: "", deactiveDate: ""
        });
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: "0 auto", paddingTop: "80px" }}>
            <Typography variant="h4">Business Place Management</Typography>
            {isLoading ? (
                <CircularProgress sx={{ mt: 2 }} />
            ) : error ? (
                <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
            ) : (
                <List sx={{ mt: 2 }}>
                    {businessPlaces.map(place => (
                        <ListItem key={place._id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography variant="h6">{place.placeName}</Typography>
                                <Typography>Email: {place.placeEmailId}</Typography>
                                <Typography>Contact: {place.contact}</Typography>
                                <Typography>Location: {place.location}</Typography>
                            </Box>
                            {isAdmin && (
                                <Box>
                                    <IconButton color="primary" onClick={() => handleEditBusinessPlace(place)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDeleteBusinessPlace(place._id)}>
                                        <Delete />
                                    </IconButton>
                                </Box>
                            )}
                        </ListItem>
                    ))}
                </List>
            )}

            {isAdmin && (
                <Button variant="contained" color="primary" startIcon={<Add />} sx={{ mt: 2 }} onClick={() => setOpenDialog(true)}>
                    Add Business Place
                </Button>
            )}

            {/* Dialog for Add/Edit */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editMode ? "Edit Business Place" : "Add New Business Place"}</DialogTitle>
                <DialogContent>
                    <TextField name="placeName" label="Place Name" fullWidth margin="dense" value={businessPlaceData.placeName} onChange={handleInputChange} />
                    <TextField name="address" label="Address" fullWidth margin="dense" value={businessPlaceData.address} onChange={handleInputChange} />
                    <TextField name="placeEmailId" label="Email" type="email" fullWidth margin="dense" value={businessPlaceData.placeEmailId} onChange={handleInputChange} />
                    <TextField name="contact" label="Contact" fullWidth margin="dense" value={businessPlaceData.contact} onChange={handleInputChange} />
                    <TextField name="location" label="Location" fullWidth margin="dense" value={businessPlaceData.location} onChange={handleInputChange} />
                    <TextField select name="city" label="City" fullWidth margin="dense" value={businessPlaceData.city} onChange={handleInputChange}>
                        {cities.map(city => (
                            <MenuItem key={city._id} value={city._id}>{city.name}</MenuItem>
                        ))}
                    </TextField>
                    <FormControlLabel control={<Checkbox checked={businessPlaceData.over} onChange={handleCheckboxChange} name="over" />} label="Over" />
                    <FormControlLabel control={<Checkbox checked={businessPlaceData.activeStatus} onChange={handleCheckboxChange} name="activeStatus" />} label="Active Status" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveBusinessPlace} variant="contained" disabled={!isAdmin}>
                        {editMode ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BusinessPlaceManagement;
