import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Snackbar,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  TablePagination, // Import TablePagination
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { filterTickets, getAllTickets, updateTicket } from '../../redux/slices/ticketSlice';
import { GetFilterData, GetTicketEndpoint, UpdateTicketEndpoint } from '../../Atoms/constatnt';

const ManageTicket = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticket.ticket);
  const isLoading = useSelector((state) => state.ticket.isLoading);
  const isError = useSelector((state) => state.ticket.isError);
  const token = useSelector((state) => state.auth.token);
  const departments = useSelector((state) => state.department.department);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState('Open');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // New state for status filter
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleFilterApply = () => {
    endpoint: GetFilterData,
    dispatch(filterTickets({
      token: token,
      query: {
        department: departmentFilter === 'All' ? 'All' : departmentFilter,
        status: statusFilter === 'All' ? 'All' : statusFilter, // Include status in the filter query
        startDate,
        endDate,
      },
    }));
    setPage(0); // Reset page to the first page after applying filters
  };

  const handleClearFilters = () => {
    setDepartmentFilter('All');
    setStatusFilter('All'); // Reset status filter
    setStartDate('');
    setEndDate('');
    dispatch(getAllTickets({ endpoint: GetTicketEndpoint, token: token }));
    setPage(0); // Reset page to the first page after clearing filters
  };

  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket);
    setUpdatedStatus(ticket.status);
    setUpdatedDescription(ticket.description);
    setOpenDialog(true);
  };

  const handleUpdateTicket = async () => {
    await dispatch(updateTicket({
      data: {
        ticketId: selectedTicket._id,
        status: updatedStatus,
        description: updatedDescription,
      },
      endpoint: UpdateTicketEndpoint,
      token: token,
    })).unwrap();
    setOpenDialog(false);
    setSnackbar({ open: true, message: 'Ticket updated successfully!', severity: 'success' });
  };

  useEffect(() => {
    if (isError) {
      setSnackbar({ open: true, message: isError, severity: 'error' });
    }
  }, [isError]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        setSnackbar({ ...snackbar, open: false });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        paddingTop: { xs: '80px', sm: '100px', md: '120px' },
        maxWidth: '1200px',
        margin: '0 auto',
        overflowY: 'auto',
        maxHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
        Manage Tickets
      </Typography>

      <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
        Total Tickets: {tickets.length}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          margin="dense"
          label="Filter by Department"
          select
          fullWidth
          variant="outlined"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          sx={{ bgcolor: theme.palette.background.paper }}
        >
          <MenuItem value="All">All</MenuItem>
          {departments.map((department, index) => (
            <MenuItem key={index} value={department.name}>
              {department.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="dense"
          label="Filter by Status" // New status filter
          select
          fullWidth
          variant="outlined"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ bgcolor: theme.palette.background.paper }}
        >
          <MenuItem value="All">All</MenuItem>
          {['Open', 'In Progress', 'Resolved', 'Hold', 'Re-opened'].map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            variant="filled"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputProps={{
              sx: { bgcolor: theme.palette.background.paper, width: '45%' },
            }}
            InputLabelProps={{
              shrink: true, // Keep the label above the input field when a value is selected
            }}
          />

          <TextField
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            variant="filled"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputProps={{
              sx: { bgcolor: theme.palette.background.paper, width: '45%' },
            }}
            InputLabelProps={{
              shrink: true, // Keep the label above the input field when a value is selected
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleFilterApply}>
            Apply Filter
          </Button>
          <Button
            variant="contained" // Changed to "contained" for a solid button look
            sx={{
              backgroundColor: '#f44336', // Custom color (red for emphasis)
              color: 'white',
              '&:hover': {
                backgroundColor: '#d32f2f', // Darker shade on hover
              },
              padding: '8px 16px', // Add some padding for better appearance
              borderRadius: '8px', // Rounded corners
              boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', // Shadow for depth
            }}
            onClick={handleClearFilters}
          >
            Clear All Filters
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.light }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.light }}>Status</TableCell>
                {/* <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.light }}>Priority</TableCell> */}
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.light }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.light }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.light }}>Updated At</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.light }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.light }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ticket) => (
                <TableRow key={ticket._id} sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    {ticket.status}
                    {ticket.re_opened && <span style={{ color: 'orange' }}> (This ticket has been re-opened)</span>}
                  </TableCell>
                  {/* <TableCell>{ticket.priority}</TableCell> */}
                  <TableCell>{ticket.creator_department}</TableCell>
                  <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(ticket.updatedAt).toLocaleString()}</TableCell>
                  <TableCell>{ticket.description}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" startIcon={<Edit />} size="small" onClick={() => handleEditClick(ticket)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <TablePagination
        component="div"
        count={tickets.length}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0); // Reset page to the first page after changing rows per page
        }}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Ticket</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Status"
            select
            fullWidth
            variant="outlined"
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value)}
            sx={{ bgcolor: theme.palette.background.paper }}
          >
            {['Open', 'In Progress', 'Resolved', 'Hold', 'Re-opened'].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            sx={{ bgcolor: theme.palette.background.paper }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateTicket} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default ManageTicket;