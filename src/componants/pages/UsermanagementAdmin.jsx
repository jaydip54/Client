// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, useMediaQuery, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, CircularProgress, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, getUser } from '../../redux/slices/registerSlice';
import { AddUserEndpoint, GetUserEndpoint } from '../../Atoms/constatnt';

// Main component for User Management Admin page
const UserManagementAdmin = () => {
  // Initialize hooks and get state from Redux store
  const dispatch = useDispatch();
  const { register, isError, isLoading } = useSelector(state => state.register);
  // console.log("🚀 ~ UserManagementAdmin ~ register:", register)
  let { token } = useSelector((state) => state.auth)

  const { department, isError: departmentError } = useSelector(state => state.department);
  // console.log("🚀 ~ UserManagementAdmin ~ departmentError:", departmentError)
  const { role, isError: roleError } = useSelector(state => state.role);
  // console.log("🚀 ~ UserManagementAdmin ~ roleError:", roleError)

  // Set up responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // State for new user dialog and error handling
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [user, setuser] = useState({
    name: '',
    email: '',
    department: '',
    number: '',
    password: '',
    role: ''
  });

  // Handler functions for dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setuser({ name: '', email: '', department: '', number: '', password: '', role: '' });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setuser(prev => ({ ...prev, [name]: value }));
  };

  // Function to add new user
  const handleAddUser = async () => {
    try {
      if (!user.name || !user.email || !user.number || !user.password || !user.department || !user.role) {
        setSnackbarMessage('All fields are required');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
      }
      const result = await dispatch(addUser({ data: user, endpoint: AddUserEndpoint, token: token })).unwrap();
      console.log("🚀 ~ handleAddUser ~ result:", result)
      setSnackbarMessage('User added successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseDialog();
    } catch (error) {
      if (isError) {
        setSnackbarMessage(isError);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  // Function to render user card for mobile view
  const renderUserCard = (user) => (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{user.name}</Typography>
      <Typography variant="body2">Email: {user.email}</Typography>
      <Typography variant="body2">Role: {user.role?.name || 'N/A'}</Typography>
      <Typography variant="body2">Department: {user.department?.name || 'N/A'}</Typography>
      <Typography variant="body2">Number: {user.number}</Typography>
      <Box sx={{ mt: 2 }}>
        <Button size="small">Edit</Button>
        <Button size="small" color="error">Delete</Button>
      </Box>
    </Paper>
  );

  // Render main component
  return (
    <Box sx={{
      p: { xs: 2, sm: 3, md: 4 },
      pt: { xs: '80px', sm: '100px', md: '120px' },
      maxWidth: { xs: '100%', sm: '600px', md: '900px', lg: '1200px' },
      margin: '0 auto'
    }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>User Management</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleOpenDialog}>
        Add New User
      </Button>

      {/* Dialog for adding new user */}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          {isError && <Typography color="error" sx={{ mb: 2 }}>{isError}</Typography>}
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={user.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={user.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="number"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="standard"
            value={user.number}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={user.password}
            onChange={handleInputChange}
          />
          <TextField
            select
            margin="dense"
            name="department"
            label="Department"
            fullWidth
            variant="standard"
            value={user.department}
            onChange={handleInputChange}
          >
            {department.map((dept) => (
              <MenuItem key={dept._id} value={dept._id}>
                {dept.name}
              </MenuItem>
            ))}
          </TextField>
          {departmentError && (
            <Typography variant="caption" color="error">
              {departmentError}
            </Typography>
          )}
          <TextField
            select
            margin="dense"
            name="role"
            label="Role"
            fullWidth
            variant="standard"
            value={user.role}
            onChange={handleInputChange}
          >
            {role.map((rolevalue) => (
              <MenuItem key={rolevalue._id} value={rolevalue._id}>
                {rolevalue.name}
              </MenuItem>
            ))}
          </TextField>
          {roleError && (
            <Typography variant="caption" color="error">
              {roleError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddUser}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Render loader if isLoading is true */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        /* Render user list as cards for mobile/tablet view, or as table for desktop */
        isMobile || isTablet ? (
          <Grid container spacing={2}>
            {register.map((user) => (
              <Grid item xs={12} sm={6} key={user._id}>
                {renderUserCard(user)}
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Number</TableCell>
                  {/* <TableCell>Actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {register.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role?.name || 'N/A'}</TableCell>
                    <TableCell>{user.department?.name || 'N/A'}</TableCell>
                    <TableCell>{user.number}</TableCell>
                    {/* <TableCell>
                      <Button size="small">Edit</Button>
                      <Button size="small" color="error">Delete</Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}

      {/* Snackbar for showing errors */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default UserManagementAdmin;
