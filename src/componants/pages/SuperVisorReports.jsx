import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Snackbar, Alert, CircularProgress, Pagination, TablePagination } from '@mui/material';
import { CloudDownload } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const SuperVisorReports = () => {
  const { ticket, isError, isLoading } = useSelector(state => state.ticket);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25); // Default set to 25

  useEffect(() => {          
    if (isError) {
      setSnackbarMessage(isError);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [isError]);

  const downloadCSV = () => {
    try {
      const headers = ['ID', 'Title', 'Description', 'Type', 'Status', 'Priority', 'Created At', 'Updated At', 'Resolved At', 'Created By', 'Assigned To', 'Creator Department'];
      const filteredTickets = ticket.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
      const csvContent = [
        headers.join(','),
        ...filteredTickets.map(ticket =>
          [
            ticket._id,
            ticket.title,
            ticket.description,
            ticket.issueType,
            ticket.status,
            ticket.createdAt,
            ticket.resolvedAt || '',
            ticket.createBy?.name || '',
            ticket.assignedTo?.name || '',
            ticket.creator_department || ''
          ].join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'detailed_ticket_reports.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setSnackbarMessage('CSV downloaded successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      setSnackbarMessage('Error downloading CSV');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const filterTickets = (tickets) => {
    return tickets.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{
      p: { xs: 2, sm: 3, md: 4 },
      pt: { xs: '80px', sm: '100px', md: '120px' },
      maxWidth: { xs: '100%', sm: '600px', md: '900px', lg: '1200px' },
      margin: '0 auto'
    }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
        Detailed Ticket Reports
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudDownload />}
          onClick={downloadCSV}
          disabled={isLoading}
        >
          Download Detailed CSV
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="detailed ticket reports table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Resolved At</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Creator Department</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterTickets(ticket).map((ticket) => (
                  <TableRow key={ticket._id}>
                    <TableCell>{ticket._id}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.description}</TableCell>
                    <TableCell>{ticket.issueType}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
                    <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{ticket.resolved_at ? new Date(ticket.resolved_at).toLocaleString() : 'N/A'}</TableCell>
                    <TableCell>{ticket.createBy?.name || 'N/A'}</TableCell>
                    <TableCell>{ticket.creator_department || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={ticket.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[25]} // Set to only 25 rows per page
          />
        </Box>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {isError && (
        <Typography color="error" sx={{ mt: 2 }}>
          Error: {isError}
        </Typography>
      )}
    </Box>
  );
};

export default SuperVisorReports;
