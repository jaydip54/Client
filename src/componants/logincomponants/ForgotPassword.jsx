import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, Link as MuiLink, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SendOtpApi, VerifyOtpApi, ChangePasswordApi, clearOtpMessage, clearVerifyOtpMessage, clearChangePasswordMessage } from '../../redux/slices/authSlice'; // Make sure to import all relevant actions
import { ChangePasswordEndpoint, FillOtpEndpoint, SendOtpEndpoint } from '../../Atoms/constatnt';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Default severity

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sendOtpError = useSelector((state) => state.auth.sendOtp.error);
    const sendOtpLoading = useSelector((state) => state.auth.sendOtp.isLoading);
    const verifyOtpError = useSelector((state) => state.auth.verifyOtp.error);
    const changePasswordError = useSelector((state) => state.auth.changePassword.error);
    const changePasswordLoading = useSelector((state) => state.auth.changePassword.isLoading);
    const verifyOtpLoading = useSelector((state) => state.auth.verifyOtp.isLoading);
    const sendOtpSuccessMessage = useSelector((state) => state.auth.sendOtp.successMessage);
    const verifyOtpSuccessMessage = useSelector((state) => state.auth.verifyOtp.successMessage);
    const changePasswordSuccessMessage = useSelector((state) => state.auth.changePassword.successMessage);

    useEffect(() => {
        // Show snackbar for success messages only
        if (sendOtpSuccessMessage) {
            setSnackbarMessage(sendOtpSuccessMessage || 'OTP Sent Successfully!');
            setSnackbarOpen(true);
            setSnackbarSeverity('success'); // Set severity to success
            setOtpSent(true);
            setTimeout(() => {
                dispatch(clearOtpMessage())
            }, 2000);
        }

        if (verifyOtpSuccessMessage) {
            setOtpVerified(true);
            setSnackbarMessage('OTP verified successfully!');
            setSnackbarOpen(true);
            setSnackbarSeverity('success'); // Set severity to success
            setTimeout(() => {
                dispatch(clearVerifyOtpMessage())
            }, 2000);
        }

        if (changePasswordSuccessMessage) {
            setSnackbarMessage(changePasswordSuccessMessage);
            setSnackbarOpen(true);
            setSnackbarSeverity('success');
            setPassword('')
            setTimeout(() => {
                dispatch(clearChangePasswordMessage())
            }, 2000);
            setTimeout(() => navigate('/'), 2000);
        }

        // Handle errors and show them in snackbar
        if (sendOtpError) {
            setSnackbarMessage(sendOtpError);
            setSnackbarOpen(true);
            setSnackbarSeverity('error'); // Set severity to error
        }

        if (verifyOtpError) {
            setSnackbarMessage(verifyOtpError);
            setSnackbarOpen(true);
            setSnackbarSeverity('error'); // Set severity to error
        }

        if (changePasswordError) {
            setSnackbarMessage(changePasswordError);
            setSnackbarOpen(true);
            setSnackbarSeverity('error'); // Set severity to error
        }

    }, [
        sendOtpSuccessMessage,
        verifyOtpSuccessMessage,
        changePasswordSuccessMessage,
        sendOtpError,
        verifyOtpError,
        changePasswordError,
        navigate
    ]);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleOtpChange = (e) => setOtp(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(SendOtpApi({
            data: {
                email: email.toString()
            }, endpoint: SendOtpEndpoint
        }));
    };

    const handleOtpVerification = (e) => {
        e.preventDefault();
        dispatch(VerifyOtpApi({
            data: {
                email: email.toString(),
                otp: otp.toString().trim()
            }, endpoint: FillOtpEndpoint
        }));
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        dispatch(ChangePasswordApi({
            data: {
                email: email.toString(),
                newpassword: password.toString()
            }, endpoint: ChangePasswordEndpoint
        }));
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f0f0f0">
            <Paper elevation={3} sx={{ padding: 4, width: 400, textAlign: 'center' }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Forgot Password
                </Typography>

                {/* Email Input Form */}
                {!otpSent && (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email Address"
                            type="text"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            disabled={sendOtpLoading} // Disable button when loading
                        >
                            {sendOtpLoading ? 'Sending...' : 'Send OTP'}
                        </Button>
                    </form>
                )}

                {/* OTP Input Form */}
                {otpSent && !otpVerified && (
                    <form onSubmit={handleOtpVerification}>
                        <TextField
                            label="Enter OTP"
                            type="text"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={otp}
                            onChange={handleOtpChange}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            disabled={verifyOtpLoading} // Disable button when loading
                        >
                            {verifyOtpLoading ? 'Verifying...' : 'Verify OTP'}
                        </Button>
                    </form>
                )}

                {/* New Password Input Form */}
                {otpVerified && (
                    <form onSubmit={handlePasswordSubmit}>
                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            disabled={changePasswordLoading} // Disable button when loading
                        >
                            {changePasswordLoading ? 'Changing...' : 'Set New Password'}
                        </Button>
                    </form>
                )}

                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
                    Remember your password?{' '}
                    <MuiLink component={Link} to="/" color="primary" underline="hover">
                        Go to Login
                    </MuiLink>
                </Typography>

                {/* Snackbar for success or error message */}
                <Snackbar open={snackbarOpen} autoHideDuration={1900} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default ForgotPassword;
