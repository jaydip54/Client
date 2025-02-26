import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, useMediaQuery, useTheme, Snackbar, Alert, Link as MuiLink } from '@mui/material';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { loginEndpoint } from '../../Atoms/constatnt';
import { Link, useNavigate } from 'react-router-dom';
import { loginapi } from '../../redux/slices/authSlice';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { role, token, message, isLoading, isError, auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;
    if (!email || !password) {
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    dispatch(loginapi({ endpoint: loginEndpoint, data: loginData }));
  };

  useEffect(() => {
    if (auth === true && token) {
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have been successfully logged in!',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate('/dashboard');
      });
    }

  }, [auth]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleLogin}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: isMobile ? '100%' : '400px',
        margin: '0 auto',
        paddingTop: isMobile ? '60px' : '100px',
        px: isMobile ? 2 : 0,
      }}
    >

      <Typography component="h1" variant="h5" sx={{ mb: 2, fontSize: isMobile ? '1.5rem' : '2rem' }}>
        Sign In
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        value={loginData.email}
        onChange={handleChange}
        autoComplete="email"
        autoFocus
        size={isMobile ? 'small' : 'medium'}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={loginData.password}
        onChange={handleChange}
        autoComplete="current-password"
        size={isMobile ? 'small' : 'medium'}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: isMobile ? 1 : 1.5 }}
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
        <MuiLink component={Link} to="/forgotpassword" color="primary">
          Forgot Password?
        </MuiLink>
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
        <MuiLink component={Link} to="/signup" color="primary">
          Sign Up
        </MuiLink>
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
        <MuiLink component={Link} to="/emailsub" color="primary">
          Email Subscribed
        </MuiLink>
      </Typography>
      <Snackbar open={isError ? true : false} autoHideDuration={6000} onClose={() => dispatch({ type: 'auth/clearError' })}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {isError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
