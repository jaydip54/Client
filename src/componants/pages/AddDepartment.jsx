import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Snackbar, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add as AddIcon } from '@mui/icons-material';
import { AddDepartmentEndpoint, DepartmentEndpoint } from '../../Atoms/constatnt';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDepartments, addDepartment } from '../../redux/slices/departmentSlice';
import MuiAlert from '@mui/material/Alert';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 20,
  boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255,255,255,0.18)',
  background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    transition: 'all 0.3s',
    '&:hover': {
      boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.4)',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: '12px 24px',
  fontSize: '1rem',
  textTransform: 'none',
  boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)',
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddDepartment = () => {
  const dispatch = useDispatch();
  let { token } = useSelector((state) => state.auth)
  const { department, isLoading, isError } = useSelector(state => state.department);

  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(''); // Add state for priority
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (isError) {
      setSnackbarMessage(isError);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [isError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addDepartment({
        endpoint: AddDepartmentEndpoint,
        data: { name: departmentName, description: description, priority: priority },
        token: token
      })).unwrap();

      setSnackbarMessage('Department added successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      setDepartmentName('');
      setDescription('');
      setPriority(''); // Reset priority
      dispatch(getAllDepartments({ endpoint: DepartmentEndpoint, token: token }));
    } catch (error) {
      console.error('Error adding department:', error);
      setSnackbarMessage('Failed to add department. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{
        p: { xs: 2, sm: 3, md: 4 },
        paddingTop: { xs: '80px', sm: '100px', md: '120px' },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <Typography variant="h4" gutterBottom sx={{
          fontWeight: 'bold',
          color: '#333',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          textAlign: 'center',
          marginBottom: 4,
        }}>
          Departments
        </Typography>
        <StyledPaper elevation={3}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Department Name"
                  variant="outlined"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    label="Priority"
                    required
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Critical">Critical</MenuItem>
                    <MenuItem value="Urgent">Urgent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<AddIcon />}
                >
                  Add Department
                </StyledButton>
              </Grid>
            </Grid>
          </form>
        </StyledPaper>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Existing Departments
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>NO.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Priority</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {department?.map((dept, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{dept?.name}</TableCell>
                    <TableCell>{dept?.description}</TableCell>
                    <TableCell>{dept?.priority}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddDepartment;
