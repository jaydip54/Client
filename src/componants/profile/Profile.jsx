import React, { useState, useEffect } from 'react';
import { useMediaQuery, Paper, Avatar, Typography, Box, Chip, Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import { Email, Phone, Business, Group } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Profile = ({ isSidebarVisible }) => {
    const { profile, isLoading, isError } = useSelector((state) => state.profile);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(min-width:601px) and (max-width:960px)');

    const styles = {
        container: {
            padding: '1rem',
            paddingTop: '100px',
            marginLeft: isMobile ? '0' : isTablet ? '0' : (isSidebarVisible ? '240px' : '0'),
            transition: 'margin-left 0.3s ease',
            maxWidth: '1000px',
            margin: '0 auto',
        },
        paper: {
            padding: '2rem',
            borderRadius: '15px',
            backgroundColor: '#f7f9fc',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
        },
        avatar: {
            width: '150px',
            height: '150px',
            fontSize: '3.5rem',
            backgroundColor: '#3f51b5',
            margin: '0 auto 1.5rem auto',
            border: '5px solid #fff',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        },
        name: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '0.5rem',
            color: '#333',
        },
        role: {
            fontSize: '1.5rem',
            color: '#555',
            textAlign: 'center',
            marginBottom: '1rem',
        },
        infoChip: {
            padding: '0.5rem',
            fontSize: '1rem',
            margin: '0.5rem',
            borderRadius: '20px',
        },
        loader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        },
        notice: {
            marginTop: '2rem',
            padding: '1rem',
            borderRadius: '5px',
            backgroundColor: '#ffe8e8',
            color: '#d32f2f',
            textAlign: 'center',
            fontWeight: 'bold',
        },
    };

    useEffect(() => {
        // Open Snackbar if there's an error
        if (isError) {
            setOpenSnackbar(true);
        }
    }, [isError]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (isLoading) {
        return (
            <div style={styles.loader}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <Paper elevation={3} style={styles.paper}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <Avatar
                        src={profile.avatar || ''}
                        alt={profile.name}
                        style={styles.avatar}
                    >
                        {!profile.avatar && profile.name ? profile.name.charAt(0).toUpperCase() : ''}
                    </Avatar>
                    <Typography variant="h3" style={styles.name}>
                        {profile.name}
                    </Typography>
                    <Typography variant="h5" style={styles.role}>
                        {profile.role && profile.role.name}
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Chip
                                icon={<Email style={{ fontSize: '1.5rem' }} />}
                                label={profile.email}
                                color="primary"
                                variant="outlined"
                                style={styles.infoChip}
                            />
                        </Grid>
                        {profile.number && (
                            <Grid item>
                                <Chip
                                    icon={<Phone style={{ fontSize: '1.5rem' }} />}
                                    label={profile.number}
                                    color="secondary"
                                    variant="outlined"
                                    style={styles.infoChip}
                                />
                            </Grid>
                        )}
                        {profile.department && profile.department.name && (
                            <Grid item>
                                <Chip
                                    icon={<Business style={{ fontSize: '1.5rem' }} />}
                                    label={profile.department.name}
                                    color="info"
                                    variant="outlined"
                                    style={styles.infoChip}
                                />
                            </Grid>
                        )}
                        {profile.department && profile.department.priority && (
                            <Grid item>
                                <Chip
                                    label={`Priority: ${profile.department.priority}`}
                                    color="warning"
                                    variant="outlined"
                                    style={styles.infoChip}
                                />
                            </Grid>
                        )}
                        {profile.team && (
                            <Grid item>
                                <Chip
                                    icon={<Group style={{ fontSize: '1.5rem' }} />}
                                    label={profile.team}
                                    color="success"
                                    variant="outlined"
                                    style={styles.infoChip}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Paper>

            {/* Notice Section */}
            {profile.department?.priority === 'High' && (
                <div style={styles.notice}>
                    Notice: This department has high priority tasks.
                </div>
            )}

            {/* Error Snackbar */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Failed to load profile information. Please try again.
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Profile;
