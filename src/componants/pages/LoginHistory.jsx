import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box, Typography, List, ListItem, IconButton, CircularProgress, TextField, Button, Avatar, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { fetchLoginHistoryByUser, deleteLoginHistory } from "../../redux/slices/loginhistory";

const LoginHistory = () => {
    const dispatch = useDispatch();
    const { history, isLoading, error } = useSelector((state) => state.loginHistory);
    const { token } = useSelector((state) => state.auth);
    const { register: users, isLoading: usersLoading } = useSelector((state) => state.register); // Fetch users for dropdown

    const [selectedUserId, setSelectedUserId] = useState("");


    const handleFetchByUser = () => {
        if (selectedUserId) {
            dispatch(fetchLoginHistoryByUser({ userId: selectedUserId, token }));
        }
    };

    const handleDeleteRecord = (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(deleteLoginHistory({ id, token }));
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 800, margin: "0 auto", paddingTop: "80px" }}>
            <Typography variant="h4">Login History</Typography>

            {/* Select User Dropdown */}
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Select User</InputLabel>
                <Select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                >
                    {usersLoading ? (
                        <MenuItem disabled>Loading users...</MenuItem>
                    ) : users.length > 0 ? (
                        users.map((user) => (
                            <MenuItem key={user._id} value={user._id}>
                                {user.name} ({user.emailed})
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No users found</MenuItem>
                    )}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                onClick={handleFetchByUser}
                sx={{ mt: 2 }}
                disabled={!selectedUserId}
            >
                Fetch Login History
            </Button>

            {isLoading ? (
                <CircularProgress sx={{ mt: 2 }} />
            ) : error ? (
                <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
            ) : (
                <List sx={{ mt: 2 }}>
                    {history.length > 0 ? (
                        history.map((record) => (
                            <ListItem
                                key={record._id}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderBottom: "1px solid #ddd",
                                    paddingY: 2
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Avatar src={record.user?.propic} alt={record.user?.name} />
                                    <Box>
                                        <Typography variant="h6">{record.user?.name}</Typography>
                                        <Typography>Email: {record.user?.emailed}</Typography>
                                        <Typography>Contact: {record.user?.contact}</Typography>
                                        <Typography>Last Login: {new Date(record.Lhdate).toLocaleString()}</Typography>
                                    </Box>
                                </Box>
                                <IconButton color="secondary" onClick={() => handleDeleteRecord(record._id)}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        ))
                    ) : (
                        <Typography>No login history found for this user.</Typography>
                    )}
                </List>
            )}
        </Box>
    );
};

export default LoginHistory;
