import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Link as MuiLink } from "@mui/material";
import { baseUrl } from "../../Atoms/constatnt";
import { Link } from "react-router-dom";

const SubscribeEmail = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubscribe = async () => {
        if (!email) {
            setMessage("Please enter an email.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}emailsub/subscribe`, { email });
            setMessage("Subscription successful!");
            setEmail(""); // Clear input
        } catch (error) {
            setMessage("Failed to subscribe. Try again.");
        }
        setLoading(false);
    };

    return (
        <Box sx={{ p: 4, maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
            <Typography variant="h5" mb={2}>Subscribe to Our Newsletter</Typography>
            <TextField
                label="Enter your email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubscribe}
                disabled={loading}
            >
                {loading ? "Subscribing..." : "Subscribe"}
            </Button>

            {message && <Typography color="secondary" mt={2}>{message}</Typography>}
            <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                <MuiLink component={Link} to="/" color="primary">
                    Login
                </MuiLink>
            </Typography>
        </Box>
    );
};

export default SubscribeEmail;
