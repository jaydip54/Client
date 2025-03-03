import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Button,
    CircularProgress, IconButton, TextField, Dialog, DialogTitle, DialogContent,
    DialogActions
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { addParkingSpace, deleteParkingSpace, updateParkingSpace } from "../../redux/slices/parkingSpace";

const UserParkingList = () => {
    const dispatch = useDispatch();
    const { spaces, loading, error } = useSelector((state) => state.parkingSpaces);
    const { type, token } = useSelector((state) => state.auth);

    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [parkingData, setParkingData] = useState({ name: "", id: null });

    const handleInputChange = (e) => {
        setParkingData({ ...parkingData, name: e.target.value });
    };

    const handleSave = () => {
        if (!token) return;
        if (editMode) {
            dispatch(updateParkingSpace({ id: parkingData.id, name: parkingData.name, token }));
        } else {
            dispatch(addParkingSpace(parkingData.name));
        }
        handleCloseDialog();
    };

    const handleEdit = (space) => {
        setParkingData({ name: space.name, id: space._id });
        setEditMode(true);
        setOpenDialog(true);
    };

    const handleDelete = (id) => {
        if (type === 1 && window.confirm("Are you sure you want to delete this parking space?")) {
            dispatch(deleteParkingSpace(id));
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditMode(false);
        setParkingData({ name: "", id: null });
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, mt: 2, p: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="parking spaces table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Updated At</TableCell>
                        {type === 1 && <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={type === 1 ? 4 : 3} align="center">
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : error ? (
                        <TableRow>
                            <TableCell colSpan={type === 1 ? 4 : 3} align="center" sx={{ color: "red" }}>
                                Error: {error}
                            </TableCell>
                        </TableRow>
                    ) : (
                        spaces.map((space) => (
                            <TableRow key={space._id}>
                                <TableCell>{space.name}</TableCell>
                                <TableCell>{new Date(space.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{new Date(space.updatedAt).toLocaleString()}</TableCell>
                                {type === 1 && (
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEdit(space)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => handleDelete(space._id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {type === 1 && (
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    sx={{ mt: 2 }}
                    onClick={() => setOpenDialog(true)}
                >
                    Add Parking Space
                </Button>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editMode ? "Edit Parking Space" : "Add Parking Space"}</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Parking Space Name"
                        fullWidth
                        margin="dense"
                        value={parkingData.name}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        {editMode ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
};

export default UserParkingList;
