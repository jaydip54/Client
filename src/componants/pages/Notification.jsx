import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, useMediaQuery } from '@mui/material';
import { Notifications as NotificationsIcon, Info as InfoIcon, Warning as WarningIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Notification = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const notifications = [
        { id: 1, type: 'info', message: 'New software update available', time: '2 hours ago' },
        { id: 2, type: 'warning', message: 'Server maintenance scheduled for tonight', time: '5 hours ago' },
        { id: 3, type: 'success', message: 'Your ticket #1234 has been resolved', time: '1 day ago' },
        { id: 4, type: 'info', message: 'New policy update: Please review', time: '2 days ago' },
    ];

    const getIcon = (type) => {
        switch(type) {
            case 'info': return <InfoIcon color="info" />;
            case 'warning': return <WarningIcon color="warning" />;
            case 'success': return <CheckCircleIcon color="success" />;
            default: return <NotificationsIcon color="action" />;
        }
    };

    return (
        <Box sx={{
            p: isMobile ? 2 : isTablet ? 3 : 4,
            paddingTop: isMobile ? '80px' : '100px',
            maxWidth: isMobile ? '100%' : isTablet ? '600px' : '800px',
            margin: '0 auto',
            width: '100%'
        }}>
            <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 'bold', 
                color: '#333', 
                marginBottom: isMobile ? '15px' : '20px', 
                fontSize: isMobile ? '1.5rem' : isTablet ? '1.8rem' : '2rem' 
            }}>
                Notifications
            </Typography>
            <List>
                {notifications.map((notification, index) => (
                    <React.Fragment key={notification.id}>
                        <ListItem alignItems="flex-start" sx={{ 
                            py: isMobile ? 1.5 : 2,
                            flexDirection: isMobile ? 'column' : 'row',
                            alignItems: isMobile ? 'flex-start' : 'center'
                        }}>
                            <ListItemIcon sx={{ 
                                minWidth: isMobile ? '30px' : '40px',
                                marginRight: isMobile ? 1 : 2,
                                marginBottom: isMobile ? 1 : 0
                            }}>
                                {getIcon(notification.type)}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body1" sx={{
                                        fontSize: isMobile ? '0.9rem' : isTablet ? '1rem' : '1.1rem',
                                        fontWeight: 'medium'
                                    }}>
                                        {notification.message}
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        sx={{ 
                                            display: 'inline',
                                            fontSize: isMobile ? '0.8rem' : '0.9rem'
                                        }}
                                        component="span"
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {notification.time}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default Notification;