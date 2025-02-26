import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, Link as MuiLink, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    SendOtpApi,
    VerifyOtpApi,
    ChangePasswordApi,
    clearOtpMessage,
    clearVerifyOtpMessage,
    clearChangePasswordMessage
} from '../../redux/slices/authSlice';
import { ChangePasswordEndpoint, FillOtpEndpoint, SendOtpEndpoint } from '../../Atoms/constatnt';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        sendOtp,
        verifyOtp,
        changePassword
    } = useSelector((state) => state.auth);

    useEffect(() => {
        if (sendOtp.successMessage) {
            setSnackbarMessage(sendOtp.successMessage);
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setOtpSent(true);
            dispatch(clearOtpMessage());
        }

        if (verifyOtp.successMessage) {
            setSnackbarMessage('OTP verified successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setOtpVerified(true);
            dispatch(clearVerifyOtpMessage());
        }

        if (changePassword.successMessage) {
            setSnackbarMessage(changePassword.successMessage);
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setPassword('');
            dispatch(clearChangePasswordMessage());
            setTimeout(() => navigate('/'), 2000);
        }

        if (sendOtp.error) {
            setSnackbarMessage(sendOtp.error);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }

        if (verifyOtp.error) {
            setSnackbarMessage(verifyOtp.error);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }

        if (changePassword.error) {
            setSnackbarMessage(changePassword.error);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    }, [
        sendOtp.successMessage, verifyOtp.successMessage, changePassword.successMessage,
        sendOtp.error, verifyOtp.error, changePassword.error, dispatch, navigate
    ]);

    const handleEmailChange = (e) => setEmail(e.target.value.trim());
    const handleOtpChange = (e) => setOtp(e.target.value.trim());
    const handlePasswordChange = (e) => setPassword(e.target.value.trim());

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(SendOtpApi({
            data: { email },
            endpoint: SendOtpEndpoint
        }));
    };

    const handleOtpVerification = (e) => {
        e.preventDefault();
        dispatch(VerifyOtpApi({
            data: { email, otp },
            endpoint: FillOtpEndpoint
        }));
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        dispatch(ChangePasswordApi({
            data: { email, newpassword: password },
            endpoint: ChangePasswordEndpoint
        }));
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f0f0f0">
            <Paper elevation={3} sx={{ padding: 4, width: 400, textAlign: 'center' }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Forgot Password
                </Typography>

                {!otpSent && (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email Address"
                            type="email"
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
                            disabled={sendOtp.isLoading}
                        >
                            {sendOtp.isLoading ? 'Sending...' : 'Send OTP'}
                        </Button>
                    </form>
                )}

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
                            disabled={verifyOtp.isLoading}
                        >
                            {verifyOtp.isLoading ? 'Verifying...' : 'Verify OTP'}
                        </Button>
                    </form>
                )}

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
                            disabled={changePassword.isLoading}
                        >
                            {changePassword.isLoading ? 'Changing...' : 'Set New Password'}
                        </Button>
                    </form>
                )}

                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
                    Remember your password?{' '}
                    <MuiLink component={Link} to="/" color="primary" underline="hover">
                        Go to Login
                    </MuiLink>
                </Typography>

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
