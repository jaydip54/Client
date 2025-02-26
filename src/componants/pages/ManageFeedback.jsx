import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box, Typography, List, ListItem, IconButton, CircularProgress, Avatar } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { baseUrl } from "../../Atoms/constatnt";

const ManageFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { token } = useSelector((state) => state.auth); // Get token from Redux store

    // Fetch feedbacks
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`${baseUrl}feedback`, {
                    headers: { Authorization: `${token}` }, // Include Bearer token in headers
                });
                setFeedbacks(response.data.feedbacks);
            } catch (error) {
                setError("Failed to load feedback.");
            }
            setLoading(false);
        };

        fetchFeedbacks();
    }, [token]);

    // Delete a feedback message
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) return;

        try {
            await axios.delete(`${baseUrl}feedback/${id}`, {
                headers: { Authorization: `${token}` }, // Include Bearer token in headers
            });
            setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
        } catch (error) {
            setError("Failed to delete feedback.");
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: "0 auto", paddingTop: "20px" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Manage Feedback</Typography>

            {loading ? (
                <CircularProgress sx={{ mt: 2 }} />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <List sx={{ mt: 2 }}>
                    {feedbacks.length > 0 ? (
                        feedbacks.map((feedback) => (
                            <ListItem
                                key={feedback._id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    borderBottom: "1px solid #ddd",
                                    paddingY: 2
                                }}
                            >
                                <Avatar src={feedback.Username?.propic} alt={feedback.Username?.name} />
                                <Box sx={{ ml: 2, flex: 1 }}>
                                    <Typography variant="h6">{feedback.Username?.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {feedback.Username?.emailed}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 1 }}>
                                        {feedback.Msg}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {new Date(feedback.createdAt).toLocaleString()}
                                    </Typography>
                                </Box>
                                <IconButton color="secondary" onClick={() => handleDelete(feedback._id)}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        ))
                    ) : (
                        <Typography>No feedback found.</Typography>
                    )}
                </List>
            )}
        </Box>
    );
};

export default ManageFeedback;
