import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAreas, addArea, updateArea, deleteArea } from "../../redux/slices/area";
import { Box, Button, TextField, Typography, List, ListItem, IconButton, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";


const AreaManagement = () => {
    const dispatch = useDispatch();
    const { areas, loading } = useSelector((state) => state.area);
    console.log("🚀 ~ AreaManagement ~ areas:", areas)
    const { cities } = useSelector(state => state.city);
    console.log("🚀 ~ AreaManagement ~ cities:", cities)
    const [areaData, setAreaData] = useState({ name: "", city: "", pincode: "" });
    const [editingArea, setEditingArea] = useState(null);

    useEffect(() => {
        dispatch(fetchAreas());

    }, [dispatch]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAreaData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddOrUpdateArea = () => {
        if (!areaData.name || !areaData.city || !areaData.pincode) {
            alert("All fields are required!");
            return;
        }

        if (editingArea) {
            dispatch(updateArea({ _id: editingArea._id, ...areaData }));
            setEditingArea(null);
        } else {
            dispatch(addArea(areaData));
        }
        setAreaData({ name: "", city: "", pincode: "" });
    };

    const handleEdit = (area) => {
        setEditingArea(area);
        setAreaData(area);
    };

    const handleDelete = (id) => {
        dispatch(deleteArea(id));
    };

    return (
        <Box sx={{ p: 4, maxWidth: 500, margin: "0 auto", paddingTop:'80px' }}>
            <Typography variant="h4">Area Management</Typography>
            <TextField
                label="Area Name"
                name="name"
                value={areaData.name}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
            />
            <TextField
                select
                label="City"
                name="city"
                value={areaData.city}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
            >
                {cities.map((city) => (
                    <MenuItem key={city._id} value={city._id}>
                        {city.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Pincode"
                name="pincode"
                value={areaData.pincode}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddOrUpdateArea}
                sx={{ mt: 2 }}
            >
                {editingArea ? "Update Area" : "Add Area"}
            </Button>

            {loading ? (
                <Typography sx={{ mt: 2 }}>Loading...</Typography>
            ) : (
                <List sx={{ mt: 2 }}>
                    {areas.map((area) => (
                        <ListItem key={area._id} sx={{ display: "flex", justifyContent: "space-between" }}>
                            {area.name} ({area.pincode})
                            <Box>
                                <IconButton color="primary" onClick={() => handleEdit(area)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => handleDelete(area._id)}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default AreaManagement;
