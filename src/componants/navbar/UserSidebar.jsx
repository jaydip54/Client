import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { ExitToApp, AccountCircle, Brightness4, Brightness7, Menu, Close, Dashboard, Lock, History, Feedback, LocalShipping } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { clearProfile } from '../../redux/slices/profileSlice';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
const UserSidebar = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    let navigate = useNavigate()
    let dispatch = useDispatch()

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleLogout = () => {
        dispatch(clearProfile())
        dispatch(logout())
        navigate('/')
    };

    return (
        <>
            <nav style={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                padding: '1rem',
                position: 'fixed',
                width: '100%',
                zIndex: 100,
                color: darkMode ? 'white' : 'black',
                transition: 'background-color 0.3s ease'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div onClick={toggleSidebar} style={{
                            cursor: 'pointer',
                            marginRight: '1rem',
                            transition: 'transform 0.3s ease'
                        }}>
                            {isSidebarVisible ? (
                                <Close style={{ fontSize: 24, transform: 'rotate(180deg)' }} />
                            ) : (
                                <Menu style={{ fontSize: 24 }} />
                            )}
                        </div>

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/profile" style={{
                            color: darkMode ? 'white' : 'black',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '1rem',
                            transition: 'opacity 0.3s ease'
                        }}>
                            <AccountCircle style={{ fontSize: 24 }} />
                        </Link>
                        <div onClick={toggleTheme} style={{ cursor: 'pointer' }}>
                            {darkMode ? (
                                <Brightness7 style={{ fontSize: 24, color: 'white' }} />
                            ) : (
                                <Brightness4 style={{ fontSize: 24 }} />
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <Box
                sx={{
                    width: '240px',
                    height: '100%',
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    color: darkMode ? 'white' : 'black',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem',
                    alignItems: 'center',
                    position: 'fixed',
                    left: isSidebarVisible ? 0 : '-240px',
                    top: 0,
                    overflowY: 'auto',
                    transition: 'left 0.3s ease',
                    zIndex: 300,
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h1>USER </h1>
                    <h2>Dashboard</h2>
                </div>

                <List sx={{ width: '100%' }}>
                    <ListItem component={Link} to="/dashboard" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <Dashboard sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem component={Link} to="/booking" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <AddLocationAltIcon sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Book Parking" />
                    </ListItem>
                    <ListItem component={Link} to="/history" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <History sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Personal Login History" />
                    </ListItem>
                    <ListItem component={Link} to="/feedback" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <Feedback sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Give Feedback" />
                    </ListItem>
                    <ListItem component={Link} to="/packages" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <LocalShipping sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Packages" />
                    </ListItem>

                    <ListItem component={Link} to="/parkingspace" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <PinDropIcon sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Parking Space" />
                    </ListItem>

                    <ListItem component={Link} to="user/changepassword" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <Lock sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Change Password" />
                    </ListItem>

                </List>
                <Box sx={{ marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ExitToApp />}
                        onClick={handleLogout}
                        sx={{
                            backgroundColor: darkMode ? '#f44336' : '#d32f2f',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: darkMode ? '#d32f2f' : '#c62828',
                            },
                            width: '100%',
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default UserSidebar;
