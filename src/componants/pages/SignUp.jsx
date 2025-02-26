import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, MenuItem, Snackbar, CircularProgress, Link as MuiLink } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/slices/registerSlice';

const OnlineUserRegistration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cities } = useSelector(state => state.city);
    const { areas } = useSelector((state) => state.area);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        ctid: '',
        areaid: '',
        name: '',
        gender: '',
        contact: '',
        emailed: '',
        pwd: '',
        sq: '',
        sa: '',
        type: 0,
        propic: ''
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async () => {
        if (!user.ctid || !user.areaid || !user.name || !user.gender || !user.contact || !user.emailed || !user.pwd || !user.sq || !user.sa) {
            setSnackbarMessage('All fields except profile picture are required');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        if (user.type !== 0) {
            setSnackbarMessage('Invalid user type');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        try {
            setIsLoading(true);
            await dispatch(addUser({ data: user })).unwrap();
            setSnackbarMessage('User registered successfully. Redirecting to login...');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setSnackbarMessage('Registration failed');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>Online User Registration</Typography>

            {/* City Selection */}
            <TextField
                select
                name="ctid"
                label="Select City"
                fullWidth
                margin="dense"
                value={user.ctid}
                onChange={handleInputChange}
            >
                {cities.map(city => (
                    <MenuItem key={city._id} value={city._id}>
                        {city.name}
                    </MenuItem>
                ))}
            </TextField>

            {/* Area Selection */}
            {/* Area Selection */}
            <TextField
                select
                name="areaid"
                label="Select Area"
                fullWidth
                margin="dense"
                value={user.areaid}
                onChange={handleInputChange}
            >
                {areas.map(area => (
                    <MenuItem key={area._id} value={area._id}>
                        {area.name} ({area.pincode})
                    </MenuItem>
                ))}
            </TextField>


            <TextField name="name" label="Full Name" fullWidth margin="dense" value={user.name} onChange={handleInputChange} />
            <TextField select name="gender" label="Gender" fullWidth margin="dense" value={user.gender} onChange={handleInputChange}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField name="contact" label="Contact" fullWidth margin="dense" value={user.contact} onChange={handleInputChange} />
            <TextField name="emailed" label="Email" type="email" fullWidth margin="dense" value={user.emailed} onChange={handleInputChange} />
            <TextField name="pwd" label="Password" type="password" fullWidth margin="dense" value={user.pwd} onChange={handleInputChange} />
            <TextField name="sq" label="Security Question" fullWidth margin="dense" value={user.sq} onChange={handleInputChange} />
            <TextField name="sa" label="Security Answer" fullWidth margin="dense" value={user.sa} onChange={handleInputChange} />
            <TextField name="propic" label="Profile Picture URL" fullWidth margin="dense" value={user.propic} onChange={handleInputChange} />

            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleRegister} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Register'}
            </Button>

            <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                <MuiLink component={Link} to="/" color="primary">
                    Login
                </MuiLink>
            </Typography>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <MuiAlert elevation={6} variant="filled" onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default OnlineUserRegistration;
