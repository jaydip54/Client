import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isBigScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        padding: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
        marginLeft: isMobile ? 0 : '240px',
        paddingTop: isMobile ? '60px' : '100px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <ErrorOutlineIcon sx={{
        fontSize: isMobile ? 60 : isTablet ? 80 : isLaptop ? 90 : isBigScreen ? 120 : 100,
        color: '#f44336',
        mb: 2
      }} />
      <Typography variant={isMobile ? "h4" : isTablet ? "h3" : isLaptop ? "h2" : "h1"} component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant={isMobile ? "h6" : isTablet ? "h5" : isLaptop ? "h4" : "h3"} component="h2" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        paragraph
        sx={{
          maxWidth: isMobile ? '90%' : isTablet ? '75%' : isLaptop ? '65%' : '60%',
          fontSize: isMobile ? '0.9rem' : isTablet ? '1rem' : isLaptop ? '1.1rem' : '1.2rem',
        }}
      >
        The page you are looking for might have been removed or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{
          mt: 2,
          fontSize: isMobile ? '0.9rem' : isTablet ? '0.95rem' : isLaptop ? '1rem' : '1.1rem',
          padding: isMobile ? '0.5rem 1rem' : isTablet ? '0.6rem 1.2rem' : isLaptop ? '0.7rem 1.4rem' : '0.8rem 1.6rem',
        }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFound;
