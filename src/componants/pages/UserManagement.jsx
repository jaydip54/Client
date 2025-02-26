import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    Box, Typography, TextField, MenuItem, List, ListItem, IconButton, Button,
    Dialog, DialogTitle, DialogContent, DialogActions, Avatar, CircularProgress
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import { addUser, deleteUser, updateUser, getUser } from "../../redux/slices/registerSlice";

const UserManagement = () => {
    const dispatch = useDispatch();
    const { register, isLoading } = useSelector((state) => state.register);
    const { areas } = useSelector((state) => state.area);
    const { cities } = useSelector(state => state.city);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newUser, setNewUser] = useState({
        ctid: "",
        areaid: "",
        name: "",
        gender: "",
        contact: "",
        emailed: "",
        pwd: "",
        sq: "",
        sa: "",
        type: "",
        propic: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({
            ...prev,
            [name]: value,
            ...(name === "ctid" && { areaid: "" }) // Reset area when city changes
        }));
    };

    const handleSaveUser = async () => {
        const userData = { ...newUser };

        // If editing, do not update password if left empty
        if (editMode && !userData.pwd) {
            delete userData.pwd;
        }

        if (editMode) {
            dispatch(updateUser({ userId: selectedUserId, updatedData: userData }));
        } else {
            dispatch(addUser({ data: userData }));
        }

        handleCloseDialog();
    };

    const handleEditUser = (user) => {
        setNewUser({ ...user, pwd: "" }); // Prevent password update
        setSelectedUserId(user._id);
        setEditMode(true);
        setOpenDialog(true);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(userId));
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditMode(false);
        setSelectedUserId(null);
        setNewUser({
            ctid: "",
            areaid: "",
            name: "",
            gender: "",
            contact: "",
            emailed: "",
            pwd: "",
            sq: "",
            sa: "",
            type: "",
            propic: "",
        });
    };

    return (
        <Box sx={{ p: 4, maxWidth: 700, margin: "0 auto", paddingTop: '80px' }}>
            <Typography variant="h4">User Management</Typography>

            {isLoading ? (
                <CircularProgress sx={{ mt: 2 }} />
            ) : (
                <List sx={{ mt: 2 }}>
                    {register.map((user) => (
                        <ListItem key={user._id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar src={user.propic} alt={user.name} />
                                <Box>
                                    <Typography><strong>{user.name}</strong> ({["User", "Admin", "Place Owner"][user.type]})</Typography>
                                    <Typography>{user.contact} | {user.emailed}</Typography>
                                    <Typography>Area: {user.areaid?.name || "N/A"}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <IconButton color="primary" onClick={() => handleEditUser(user)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => handleDeleteUser(user._id)}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}

            <Button variant="contained" color="primary" startIcon={<Add />} sx={{ mt: 2 }} onClick={() => setOpenDialog(true)}>
                Add Admin / Place Owner
            </Button>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editMode ? "Edit User" : "Add New User"}</DialogTitle>
                <DialogContent>
                    <TextField name="name" label="Full Name" fullWidth margin="dense" value={newUser.name} onChange={handleInputChange} required />
                    <TextField name="emailed" label="Email" fullWidth margin="dense" value={newUser.emailed} onChange={handleInputChange} required />
                    {!editMode && (
                        <TextField name="pwd" label="Password" type="password" fullWidth margin="dense" value={newUser.pwd} onChange={handleInputChange} required />
                    )}
                    <TextField name="sq" label="Security Question" fullWidth margin="dense" value={newUser.sq} onChange={handleInputChange} />
                    <TextField name="sa" label="Security Answer" fullWidth margin="dense" value={newUser.sa} onChange={handleInputChange} />

                    <TextField select name="type" label="User Type" fullWidth margin="dense" value={newUser.type} onChange={handleInputChange} required>
                        <MenuItem value={0}>User</MenuItem>
                        <MenuItem value={1}>Admin</MenuItem>
                        <MenuItem value={2}>Place Owner</MenuItem>
                    </TextField>

                    <TextField name="contact" label="Contact" fullWidth margin="dense" value={newUser.contact} onChange={handleInputChange} required />

                    <TextField select name="gender" label="Gender" fullWidth margin="dense" value={newUser.gender} onChange={handleInputChange} required>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>

                    <TextField select name="ctid" label="City" fullWidth margin="dense" value={newUser.ctid} onChange={handleInputChange}>
                        {cities.map(city => <MenuItem key={city._id} value={city._id}>{city.name}</MenuItem>)}
                    </TextField>

                    <TextField select name="areaid" label="Area" fullWidth margin="dense" value={newUser.areaid} onChange={handleInputChange}>
                        {areas.map(area => <MenuItem key={area._id} value={area._id}>{area.name}</MenuItem>)}
                    </TextField>

                    <TextField name="propic" label="Profile Picture URL" fullWidth margin="dense" value={newUser.propic} onChange={handleInputChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveUser} variant="contained">
                        {editMode ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserManagement;
