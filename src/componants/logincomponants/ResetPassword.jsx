import { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const ResetPassword = () => {
    let { token } = useSelector((state) => state.auth);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("info");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setSnackbarMessage("New password and confirm password do not match.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/api/auth/reset-password", passwordData,{
                headers: {
                    'Authorization': `${token}`
                },
            });
            setSnackbarMessage(response.data.message || "Password reset successfully!");
            setSnackbarSeverity("success");
        } catch (error) {
            setSnackbarMessage(error.response?.data?.message || "Failed to reset password.");
            setSnackbarSeverity("error");
        } finally {
            setLoading(false);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f0f0f0">
            <Paper elevation={2} sx={{ padding: 3, width: 400, textAlign: "center" }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Reset Password
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                    Please enter your old password and new password.
                </Typography>

                <TextField
                    label="Old Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handleChange}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{ marginTop: 2 }}
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </Button>

                <Snackbar open={openSnackbar} autoHideDuration={1500} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default ResetPassword;