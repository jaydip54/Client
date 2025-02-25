import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddAssignedTickets } from '../../../redux/slices/assigned.Slice';
import { assignedaddendpoint } from '../../../Atoms/constatnt';

const AssignTechnician = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assignedfalseticket = useSelector(
    (state) => state.supervisorticket.assignedfalseticket.ticket
  );
  const assignedtrueticket = useSelector(
    (state) => state.supervisorticket.assignedtrueticket.ticket
  );
  const technicianDepartment = useSelector((state) => state.register.technicianDepartment);
  const techniciansLoading = useSelector((state) => state.register.isLoading);
  const techniciansError = useSelector((state) => state.register.isError);
  const token = useSelector((state) => state.auth.token);

  const assignedticket = useSelector(
    (state) => state.assigned.assigned
  );
  console.log("🚀 ~ AssignTechnician ~ assignedticket:", assignedticket)

  const [selectedTicket, setSelectedTicket] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [expandedTicketId, setExpandedTicketId] = useState(null);

  // Handle Snackbar close
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // Toggle the visibility of ticket 
  const handleToggle = (ticketId) => {
    setExpandedTicketId(expandedTicketId === ticketId ? null : ticketId);
  };

  // Dispatch function to assign technician to ticket
  const handleAssignTechnician = () => {
    // if (!selectedTicket || !selectedTechnician) {
    //   setSnackbarMessage('Please select both a ticket and a technician');
    //   setOpenSnackbar(true);
    //   return;
    // }

    // try {
    // Dispatch the action to assign the technician
    dispatch(AddAssignedTickets({
      data: {
        ticketId: selectedTicket,
        AssignedTo: selectedTechnician
      },
      endpoint: assignedaddendpoint,
      token: token
    }))
    //   .then((response) => {
    //     // Handle successful assignment
    //     if (response.payload) {
    //       setSnackbarMessage('Ticket assigned successfully');
    //       setOpenSnackbar(true);

    //       // Reset selection
    //       setSelectedTicket('');
    //       setSelectedTechnician('');
    //     } else {
    //       // Handle error case
    //       setSnackbarMessage('Failed to assign ticket');
    //       setOpenSnackbar(true);
    //     }
    //   }).catch((error) => {
    //     // Handle any errors in the dispatch
    //     setSnackbarMessage('Error assigning ticket: ' + error.message);
    //     setOpenSnackbar(true);
    //   });
    // } catch (error) {
    //   // Catch any synchronous errors
    //   setSnackbarMessage('An unexpected error occurred');
    //   setOpenSnackbar(true);
    // }
  };

  // Rest of the component remains the same as in the original code...

  return (
    <>
      <Box sx={{
        p: { xs: 2, sm: 3, md: 4 },
        pt: { xs: '80px', sm: '100px', md: '120px' },
        maxWidth: { xs: '100%', sm: '600px', md: '900px', lg: '1200px' },
        margin: '0 auto'
      }}>
        <Typography variant="h4" gutterBottom>
          Assign Technician to Ticket
        </Typography>

        {/* Select Ticket */}
        <TextField
          select
          label="Select Ticket"
          value={selectedTicket}
          onChange={(e) => setSelectedTicket(e.target.value)}
          fullWidth
          margin="normal"
        >
          {assignedfalseticket.map((ticket) => (
            <MenuItem key={ticket._id} value={ticket._id}>
              {`Title: ${ticket.title} | Type: ${ticket.issueType}`}
            </MenuItem>
          ))}
        </TextField>

        {/* Select Technician */}
        <TextField
          select
          label="Select Technician"
          value={selectedTechnician}
          onChange={(e) => setSelectedTechnician(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!selectedTicket}
        >
          {technicianDepartment.map((tech) => (
            <MenuItem key={tech._id} value={tech._id}>
              {tech.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          disabled={!selectedTicket || !selectedTechnician}
          onClick={handleAssignTechnician}
        >
          Assign Technician
        </Button>

        {/* Rest of the existing component code... */}
      </Box>
      {/* Table for Assigned True Tickets */}
      <Box sx={{
        p: { xs: 2, sm: 3, md: 4 },
        maxWidth: { xs: '100%', sm: '600px', md: '900px', lg: '1200px' },
        margin: '0 auto'
      }}>
        {assignedticket.length > 0 && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" gutterBottom>
              Assigned Tickets
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell><strong>No.</strong></TableCell>
                    <TableCell><strong>Ticket Title</strong></TableCell>
                    <TableCell><strong>Technician Name</strong></TableCell>
                    <TableCell><strong>Technician Email</strong></TableCell>
                    <TableCell><strong>Assigned Date</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong></strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assignedticket.map((ticket, index) => (
                    <TableRow
                      key={ticket?._id}
                      sx={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff' }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{ticket?.ticketId?.title}</TableCell>
                      <TableCell>{ticket?.AssignedTo?.name}</TableCell>
                      <TableCell>{ticket?.AssignedTo?.email}</TableCell>
                      <TableCell>{new Date(ticket?.assignedDate).toLocaleString()}</TableCell>
                      <TableCell>{ticket?.ticketId?.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => handleToggle(ticket._id)}
                        >
                          {expandedTicketId === ticket?._id ? 'Hide ' : 'Show '}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Expanded ticket  */}
            {expandedTicketId && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Ticket </Typography>
                {assignedticket
                  .filter(ticket => ticket?._id === expandedTicketId)
                  .map((ticket) => (
                    <Box key={ticket?._id} sx={{ padding: 2, backgroundColor: '#f9f9f9' }}>
                      <Typography><strong>Assigned By:</strong> {ticket?.AssignedBy?.name}</Typography>
                      {/* <Typography><strong>Assigned By Email:</strong> {ticket.assignedBy.email}</Typography> */}
                      <Typography><strong>{ticket?.AssignedBy?.name} Number:</strong> {ticket?.AssignedBy?.number}</Typography>
                      <Typography><strong>Assigned To:</strong> {ticket.AssignedTo.name}</Typography>
                      {/* <Typography><strong>Assigned To Email:</strong> {ticket.AssignedTo.email}</Typography> */}
                      <Typography><strong>{ticket?.AssignedTo?.name} Number:</strong> {ticket?.AssignedTo?.number}</Typography>
                      <Typography><strong>Issue Type:</strong> {ticket?.ticketId?.issueType}</Typography>

                      {/* Format the resolved_at date */}
                      {/* Check if resolved_at is available before formatting */}
                      {ticket?.ticket?.resolved_at && (
                        <Typography><strong>Ticket Resloved Time:</strong> {new Date(ticket?.ticketId?.resolved_at).toLocaleString()}</Typography>
                      )}
                      {ticket?.ticket?.createdAt && (
                        <Typography><strong>Ticket Create Time :</strong> {new Date(ticket?.ticketId?.createdAt).toLocaleString()}</Typography>
                      )}
                      {/* Display re_opened status */}
                      <Typography><strong>Reopened:</strong> {ticket?.ticketId?.re_opened ? 'Yes' : 'No'}  </Typography>
                    </Box>
                  ))}
              </Box>
            )}
          </Box>
        )}

        {/* Snackbar for success or error */}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={techniciansError ? 'error' : 'success'}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

      </Box>
    </>
  );
};

export default AssignTechnician;