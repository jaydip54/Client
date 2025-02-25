import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, MenuItem, Button, InputLabel, Select, FormControl, Paper, Grid, useMediaQuery, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Send } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { addTicket } from '../../redux/slices/ticketSlice';
import { TicketCreationEndpoint } from '../../Atoms/constatnt';

// Styled component for the main paper container
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '15px',
    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
    background: 'linear-gradient(145deg, #f3f4f6 0%, #fff 100%)',
}));

// Styled component for the submit button
const StyledButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    transition: 'all 0.3s',
    '&:hover': {
        background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
        boxShadow: '0 4px 7px 2px rgba(33, 203, 243, .4)',
    },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TicketCreation = () => {
    // State variable for form fields
    const [formData, setFormData] = useState({
        issueType: '',
        title: '',
        description: '',
    });

    let { token } = useSelector((state) => state.auth)

    // Theme and responsive design hooks
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    // Redux hooks
    const dispatch = useDispatch();
    const { isLoading, isError } = useSelector(state => state.ticket);

    // State for Snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        if (isError) {
            setOpenSnackbar(true);
        }
    }, [isError]);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(addTicket({ data: formData, endpoint: TicketCreationEndpoint, token: token })).unwrap();
            Swal.fire({
                icon: 'success',
                title: 'Ticket Created',
                text: 'Your ticket has been successfully created!',
                timer: 2000,
                showConfirmButton: false
            });
            // Clear form after successful submission
            setFormData({
                issueType: '',
                title: '',
                description: '',
                priority: ''
            });
        } catch (error) {
            setOpenSnackbar(true);
        }
    };

    // Options for issue types
    const issueTypes = [
        { value: 'IT', label: 'IT ', icon: '💻' },
        { value: 'Maintenance', label: 'Maintenance', icon: '🔧' },
        { value: 'Biomedical', label: 'Biomedical', icon: '🩺' }
    ];
    // Options for priorities
    // const priorities = [
    //     { value: 'Low', label: 'Low' },
    //     { value: 'Medium', label: 'Medium' },
    //     { value: 'High', label: 'High' },
    //     { value: 'Urgent', label: 'Urgent' }
    // ];

    return (
        <Box sx={{
            p: 3,
            marginLeft: isMobile || isTablet ? 0 : 0,
            paddingTop: isMobile ? '80px' : '100px',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', textShadow: '1px 1px 2px rgba(0,0,0,0.1)', fontSize: isMobile ? '1.5rem' : '2rem' }}>
                Create a New Ticket
            </Typography>
            <StyledPaper elevation={3}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Issue Type dropdown */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                <InputLabel>Issue Type</InputLabel>
                                <Select
                                    name="issueType"
                                    value={formData.issueType}
                                    onChange={handleInputChange}
                                    label="Issue Type"
                                >
                                    {issueTypes.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ marginRight: '8px' }}>{type.icon}</span>
                                                {type.label}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Title input field */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        {/* Priority dropdown */}
                        {/* <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleInputChange}
                                    label="Priority"
                                >
                                    {priorities.map((p) => (
                                        <MenuItem key={p.value} value={p.value}>
                                            {p.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid> */}
                        {/* Description textarea */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        {/* Submit button */}
                        <Grid item xs={12}>
                            <StyledButton type="submit" variant="contained" endIcon={<Send />} fullWidth={isMobile} disabled={isLoading}>
                                {isLoading ? 'Submitting...' : 'Submit Ticket'}
                            </StyledButton>
                        </Grid>
                    </Grid>
                </form>
            </StyledPaper>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {isError}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TicketCreation;
