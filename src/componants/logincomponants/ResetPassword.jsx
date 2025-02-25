import { useState, useEffect } from "react";
import { Box, Paper, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearMessageAfterResetPassword, ResetPasswordApi } from "../../redux/slices/authSlice";
import { ResetpasswordEndpoint } from "../../Atoms/constatnt";

const ResetPassword = () => {
    // Destructure the necessary state from Redux
    const { resetPassword: { error: resetPasswordError, successMessage: resetPasswordSuccessMessage, isLoading: resetPasswordLoading }, token } = useSelector((state) => state.auth);

    const [passwordData, setPasswordData] = useState({
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info'); // Default severity

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        dispatch(ResetPasswordApi({ data: passwordData, endpoint: ResetpasswordEndpoint, token: token }));
    };

    // Show the Snackbar based on success or error message
    useEffect(() => {
        if (resetPasswordSuccessMessage) {
            setSnackbarMessage(resetPasswordSuccessMessage);
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            // Clear message after displaying
            const timer = setTimeout(() => {
                dispatch(clearMessageAfterResetPassword());
            }, 1600);

            return () => clearTimeout(timer); // Cleanup the timeout
        }

    }, [resetPasswordError, resetPasswordSuccessMessage, dispatch]);

    // Close Snackbar handler
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f0f0f0"
        >
            <Paper elevation={2} sx={{ padding: 3, width: 400, textAlign: 'center' }}>
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
                    name="oldpassword"
                    value={passwordData.oldpassword}
                    onChange={handleChange}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    name="newpassword"
                    value={passwordData.newpassword}
                    onChange={handleChange}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    name="confirmpassword"
                    value={passwordData.confirmpassword}
                    onChange={handleChange}
                />

                {/* Show error message above the submit button */}
                {resetPasswordError && (
                    <Typography variant="body2" color="error" sx={{ mt: 1, mb: -1 }}>
                        {resetPasswordError}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{ marginTop: 2 }}
                    disabled={resetPasswordLoading} // Disable button when loading
                >
                    Reset Password
                </Button>

                {/* Snackbar for success or error message */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={1500}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default ResetPassword;
