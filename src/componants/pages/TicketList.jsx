import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, InputAdornment, useMediaQuery, Snackbar, Alert, CircularProgress } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

// Styled component for the table container
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

// Styled component for status chips
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

const TicketList = () => {

    let { token } = useSelector((state) => state.auth)
    // State variables
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const dispatch = useDispatch();
    const { ticket, isLoading, isError } = useSelector(state => state.ticket);

    const statusOptions = ['Open', 'In Progress', 'Resolved', 'Hold'];

    // Filter tickets based on search query and status filter
    const filteredTickets = ticket.filter(ticket => {
        const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || ticket.status.toLowerCase() === filter;

        return matchesSearch && matchesFilter;
    });

    // Handler for closing the snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    useEffect(() => {
        if (isError) {
            setSnackbar({ open: true, message: isError, severity: 'error' });
        }
    }, [isError]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, paddingTop: isMobile ? '80px' : '100px', maxWidth: '1200px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', marginBottom: '20px', fontSize: isMobile ? '1.5rem' : '2rem' }}>
                Ticket List
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, marginBottom: 3 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search tickets"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    sx={{ minWidth: 120, width: isMobile ? '100%' : 'auto' }}
                    startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
                >
                    <MenuItem value="all">All</MenuItem>
                    {statusOptions.map((status) => (
                        <MenuItem key={status} value={status.toLowerCase()}>{status}</MenuItem>
                    ))}
                </Select>
            </Box>

            <StyledTableContainer component={Paper} sx={{ maxHeight: isMobile ? '400px' : 'none', overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="ticket table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Issue Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Description</TableCell>
                            {/* <TableCell>Priority</TableCell> */}
                            <TableCell>Create Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTickets.map((ticket) => (
                            <TableRow key={ticket._id}>
                                <TableCell component="th" scope="row">{ticket.title}</TableCell>
                                <TableCell>{ticket.issueType}</TableCell>
                                <TableCell>
                                    <StyledChip label={ticket.status} status={ticket.status} />
                                </TableCell>
                                <TableCell>{ticket.description}</TableCell>
                                {/* <TableCell>{ticket.priority}</TableCell> */}
                                <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>

            {/* Snackbar for displaying messages */}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TicketList;
