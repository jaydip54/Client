import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, List, ListItem, IconButton, CircularProgress } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { baseUrl } from "../../Atoms/constatnt";

const ManageSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch subscriptions
    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await axios.get(`${baseUrl}emailsub/`);
                setSubscriptions(response.data.subscriptions);
            } catch (error) {
                setError("Failed to load subscriptions.");
            }
            setLoading(false);
        };

        fetchSubscriptions();
    }, []);

    // Delete a subscription
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this subscription?")) return;

        try {
            await axios.delete(`${baseUrl}emailsub/${id}`);
            setSubscriptions(subscriptions.filter((sub) => sub._id !== id));
        } catch (error) {
            setError("Failed to delete subscription.");
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: "0 auto", paddingTop: "20px" }}>
            <Typography variant="h5">Manage Subscriptions</Typography>

            {loading ? (
                <CircularProgress sx={{ mt: 2 }} />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <List sx={{ mt: 2 }}>
                    {subscriptions.length > 0 ? (
                        subscriptions.map((sub) => (
                            <ListItem
                                key={sub._id}
                                sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ddd", paddingY: 1 }}
                            >
                                <Typography>{sub.Emailed}</Typography>
                                <IconButton color="secondary" onClick={() => handleDelete(sub._id)}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        ))
                    ) : (
                        <Typography>No subscriptions found.</Typography>
                    )}
                </List>
            )}
        </Box>
    );
};

export default ManageSubscriptions;
