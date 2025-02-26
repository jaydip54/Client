import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box, TextField, Button, Typography } from "@mui/material";
import { baseUrl } from "../../Atoms/constatnt";

const FeedbackForm = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const { token } = useSelector((state) => state.auth); // Get token from Redux store

    const handleSubmit = async () => {
        if (!message) {
            setResponseMessage("Please enter a message.");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                `${baseUrl}feedback`,
                { Msg: message },
                { headers: { Authorization: `${token}` } } // Send token in headers
            );
            setResponseMessage("Feedback submitted successfully!");
            setMessage(""); // Clear input field
        } catch (error) {
            setResponseMessage("Failed to send feedback. Try again.");
        }
        setLoading(false);
    };

    return (
        <Box sx={{ p: 4, maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
            <Typography variant="h5" mb={2}>Send Us Your Feedback</Typography>
            <TextField
                label="Enter your feedback"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Sending..." : "Submit"}
            </Button>

            {responseMessage && <Typography color="secondary" mt={2}>{responseMessage}</Typography>}
        </Box>
    );
};

export default FeedbackForm;
