import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Snackbar, Alert, CircularProgress, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// Custom styled component for the table container
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    boxShadow: '0 10px 30px 0 rgba(0,0,0,0.1)',
    borderRadius: '15px',
    overflow: 'hidden',
    '& .MuiTableCell-head': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
    '& .MuiTableRow-root': {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.selected,
        },
    },
}));

// Custom styled component for status chips with dynamic colors based on ticket status
const StyledChip = styled(Chip)(({ theme, status }) => ({
    fontWeight: 'bold',
    color: theme.palette.common.white,
    backgroundColor:
        status === 'Open' ? theme.palette.success.main :
            status === 'In Progress' ? theme.palette.warning.main :
                status === 'Resolved' ? theme.palette.info.main :
                    status === 'Hold' ? theme.palette.error.main :
                        theme.palette.grey[500],
}));

const PersonalTicket = () => {
    // Accessing tickets data and loading/error states from Redux store
    const { ticket, isLoading, isError } = useSelector(state => state.supervisorticket.personalticket);

    // Snackbar state for displaying error messages
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Theme and responsive design for adjusting padding based on screen size
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Handler to close snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    // Display snackbar with error message if there's an error
    useEffect(() => {
        if (isError) {
            setSnackbar({ open: true, message: isError, severity: 'error' });
        }
    }, [isError]);

    // Loading indicator while data is being fetched
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, paddingTop: isMobile ? '80px' : '100px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header Title */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main, marginBottom: '20px', fontSize: isMobile ? '1.5rem' : '2rem' }}>
                Ticket List
            </Typography>

            {/* Tickets Table */}
            <StyledTableContainer component={Paper} sx={{ maxHeight: isMobile ? '400px' : 'none', overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="ticket table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Issue Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Create Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Mapping through tickets and displaying each one in a row */}
                        {ticket.map((ticket) => (
                            <TableRow key={ticket._id}>
                                <TableCell component="th" scope="row">{ticket.title}</TableCell>
                                <TableCell>{ticket.issueType}</TableCell>
                                <TableCell>
                                    {/* Status chip with dynamic color based on ticket status */}
                                    <StyledChip label={ticket.status} status={ticket.status} />
                                </TableCell>
                                <TableCell>{ticket.description}</TableCell>
                                <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>

            {/* Snackbar for error notifications */}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PersonalTicket;
