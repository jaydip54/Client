import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Avatar, Button } from '@mui/material';
import { AddCircleOutline, ViewList, Person, Notifications, ExitToApp, AccountCircle, Brightness4, Brightness7, Menu, Close, Dashboard, Assessment, AssignmentInd, AssignmentTurnedIn, PersonAdd, Lock } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { clearProfile } from '../../redux/slices/profileSlice';
import { clearRole } from '../../redux/slices/roleSlice';
import { clearUsers } from '../../redux/slices/registerSlice';
import { logout } from '../../redux/slices/authSlice';

const SupervisorSidebar = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleLogout = () => {
        dispatch(clearProfile())
        dispatch(clearRole())
        dispatch(clearUsers())
        dispatch(clearTickets())
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
                    <h1>SUPERVISOR</h1>
                    <h2>Dashboard</h2>
                </div>

                <List sx={{ width: '100%' }}>
                    <ListItem component={Link} to="/dashboard" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <Dashboard sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem component={Link} to="supervisor/ticketcreation" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <AddCircleOutline sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Create Ticket" />
                    </ListItem>
                    <ListItem component={Link} to="supervisor/mytickets" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <ViewList sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="My Tickets" />
                    </ListItem>
                    <ListItem component={Link} to="supervisor/reports" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <Assessment sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Ticket Reports" />
                    </ListItem>
                    <ListItem component={Link} to="supervisor/assign-technician" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <AssignmentInd sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Assign to Technician" />
                    </ListItem>
                    {/* <ListItem component={Link} to="supervisor/manageticket" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <AssignmentTurnedIn sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Tickets" />
                    </ListItem> */}
                    <ListItem component={Link} to="supervisor/usermanagement" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <PersonAdd sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="User Management" />
                    </ListItem>
                    {/* <ListItem component={Link} to="/supervisor/notification" onClick={toggleSidebar}>
                        <ListItemIcon>
                            <Notifications sx={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Notifications" />
                    </ListItem> */}
                    <ListItem component={Link} to="supervisor/changepassword" onClick={toggleSidebar}>
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

export default SupervisorSidebar;
