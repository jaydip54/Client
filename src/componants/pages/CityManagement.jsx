import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Snackbar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { addCity, deleteCity, fetchCities, updateCity } from '../../redux/slices/city';

const CityManagement = () => {
    const dispatch = useDispatch();
    const { cities, isLoading, error } = useSelector(state => state.city);

    const [city, setCity] = useState({ name: '' });
    const [editCity, setEditCity] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);



    const handleInputChange = (e) => {
        setCity({ ...city, name: e.target.value });
    };

    const handleAddCity = async () => {
        if (!city.name) {
            setSnackbarMessage('City name is required');
            setOpenSnackbar(true);
            return;
        }
        await dispatch(addCity(city));
        setSnackbarMessage('City added successfully');
        setOpenSnackbar(true);
        setCity({ name: '' });
    };

    const handleEditCity = (city) => {
        setEditCity(city);
        setOpenDialog(true);
    };

    const handleUpdateCity = async () => {
        if (!editCity.name) {
            setSnackbarMessage('City name is required');
            setOpenSnackbar(true);
            return;
        }
        await dispatch(updateCity({ id: editCity._id, updatedData: { name: editCity.name } }));
        setSnackbarMessage('City updated successfully');
        setOpenSnackbar(true);
        setOpenDialog(false);
        setEditCity(null);
    };

    const handleDeleteCity = async (id) => {
        await dispatch(deleteCity(id));
        setSnackbarMessage('City deleted successfully');
        setOpenSnackbar(true);
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: '0 auto', paddingTop:'80px'}}>
            <Typography variant="h4" gutterBottom>City Management</Typography>

            <TextField
                name="name"
                label="City Name"
                fullWidth
                margin="dense"
                value={city.name}
                onChange={handleInputChange}
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAddCity}>
                Add City
            </Button>

            {isLoading ? (
                <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
            ) : (
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>City Name</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cities.map((city) => (
                                <TableRow key={city._id}>
                                    <TableCell>{city.name}</TableCell>
                                    <TableCell>
                                        <Button size="small" onClick={() => handleEditCity(city)}>Edit</Button>
                                        <Button size="small" color="error" onClick={() => handleDeleteCity(city._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <MuiAlert elevation={6} variant="filled" onClose={() => setOpenSnackbar(false)} severity="success">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Edit City</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="City Name"
                        fullWidth
                        margin="dense"
                        value={editCity?.name || ''}
                        onChange={(e) => setEditCity({ ...editCity, name: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleUpdateCity} color="primary">Update</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CityManagement;
