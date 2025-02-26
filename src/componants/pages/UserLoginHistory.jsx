import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, List, ListItem, CircularProgress, Avatar } from "@mui/material";
import { fetchLoginHistoryByUser } from "../../redux/slices/loginhistory";

const UserLoginHistory = () => {
    const dispatch = useDispatch();
    const { history, isLoading, error } = useSelector((state) => state.loginHistory);
    const { user, token } = useSelector((state) => state.auth); // Get user info & token from auth state

    useEffect(() => {
        if (user?._id && token) {
            dispatch(fetchLoginHistoryByUser({ userId: user._id, token }));
        }
    }, [dispatch, user, token]);

    return (
        <Box sx={{ p: 4, maxWidth: 800, margin: "0 auto", paddingTop: "80px" }}>
            <Typography variant="h4">My Login History</Typography>

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
                                    alignItems: "center",
                                    borderBottom: "1px solid #ddd",
                                    paddingY: 2
                                }}
                            >
                                <Avatar src={user?.propic} alt={user?.name} />
                                <Box sx={{ ml: 2 }}>
                                    <Typography variant="h6">Login Time: {new Date(record.Lhdate).toLocaleString()}</Typography>
                                    <Typography>IP Address: {record.ip || "Unknown"}</Typography>
                                </Box>
                            </ListItem>
                        ))
                    ) : (
                        <Typography>No login history found.</Typography>
                    )}
                </List>
            )}
        </Box>
    );
};

export default UserLoginHistory;
