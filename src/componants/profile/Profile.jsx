import React, { useState, useEffect } from 'react';
import { useMediaQuery, Paper, Avatar, Typography, Box, Chip, Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import { Email, Phone, Business } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Profile = ({ isSidebarVisible }) => {
    const { profile, isLoading, isError } = useSelector((state) => state.profile);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(min-width:601px) and (max-width:960px)');

    useEffect(() => {
        if (isError) {
            setOpenSnackbar(true);
        }
    }, [isError]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: '1rem', paddingTop: '100px', marginLeft: isMobile ? '0' : isTablet ? '0' : (isSidebarVisible ? '240px' : '0'), transition: 'margin-left 0.3s ease', maxWidth: '1000px', margin: '0 auto' }}>
            <Paper elevation={3} sx={{ padding: '2rem', borderRadius: '15px', backgroundColor: '#f7f9fc', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)' }}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <Avatar src={profile.propic || ''} alt={profile.name} sx={{ width: '150px', height: '150px', fontSize: '3.5rem', backgroundColor: '#3f51b5', marginBottom: '1.5rem', border: '5px solid #fff' }}>
                        {!profile.propic && profile.name ? profile.name.charAt(0).toUpperCase() : ''}
                    </Avatar>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#333' }}>{profile.name}</Typography>
                    <Typography variant="h5" sx={{ color: '#555', textAlign: 'center', marginBottom: '1rem' }}>{profile.gender}</Typography>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Chip icon={<Email />} label={profile.emailed} color="primary" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <Chip icon={<Phone />} label={profile.contact} color="secondary" variant="outlined" />
                        </Grid>
                        {profile.ctid?.name && (
                            <Grid item>
                                <Chip icon={<Business />} label={`City: ${profile.ctid.name}`} color="info" variant="outlined" />
                            </Grid>
                        )}
                        {profile.areaid?.name && (
                            <Grid item>
                                <Chip label={`Area: ${profile.areaid.name}`} color="warning" variant="outlined" />
                            </Grid>
                        )}
                        {profile.areaid?.pincode && (
                            <Grid item>
                                <Chip label={`Pincode: ${profile.areaid.pincode}`} color="success" variant="outlined" />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Paper>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Failed to load profile information. Please try again.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Profile;
