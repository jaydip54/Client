import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Snackbar
} from '@mui/material';
import { useSelector } from 'react-redux';

const AssignedTicket = () => {
    const { assigned, isLoading, isError } = useSelector((state) => state.assigned);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const handleOpenDialog = (ticket) => {
        setSelectedTicket(ticket);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedTicket(null);
    };

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 3, md: 4 },
                pt: { xs: '80px', sm: '100px', md: '120px' },
                maxWidth: { xs: '100%', sm: '600px', md: '900px', lg: '1200px' },
                margin: '0 auto'
            }}
        >
            <Typography variant="h4" gutterBottom>
                Assigned Tickets
            </Typography>

            {/* Display Assigned Tickets in Table */}
            <Paper elevation={3} sx={{ marginTop: '20px', padding: '10px' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Issue Type</TableCell>
                                <TableCell>Assigned Date</TableCell>
                                <TableCell>Assigned By</TableCell>
                                <TableCell>Actions</TableCell> {/* Added column for actions */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assigned.map((val) => (
                                <TableRow key={val._id}>
                                    <TableCell>{val.ticketId.title}</TableCell>
                                    <TableCell>{val.ticketId.status}</TableCell>
                                    <TableCell>{val.ticketId.issueType}</TableCell>
                                    <TableCell>{new Date(val.assignedDate).toLocaleString()}</TableCell>
                                    <TableCell>{val.AssignedBy.name} ({val.AssignedBy.email})</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleOpenDialog(val)}>
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {assigned.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No tickets found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Ticket Details Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Ticket Details</DialogTitle>
                <DialogContent>
                    {selectedTicket && (
                        <Box>
                            <Typography variant="h6">Title: {selectedTicket.ticketId.title}</Typography>
                            <Typography>Status: {selectedTicket.ticketId.status}</Typography>
                            <Typography>Issue Type: {selectedTicket.ticketId.issueType}</Typography>
                            <Typography>Priority: {selectedTicket.ticketId.priority}</Typography>
                            <Typography>Assigned Date: {new Date(selectedTicket.assignedDate).toLocaleString()}</Typography>
                            <Typography>Assigned By: {selectedTicket.AssignedBy.name} ({selectedTicket.AssignedBy.number || selectedTicket.AssignedBy.number})</Typography>
                            <Typography>Creator Department: {selectedTicket.creator_department}</Typography>
                            <Typography>Description: {selectedTicket.ticketId.description}</Typography>
                            <Typography>Created At: {new Date(selectedTicket.ticketId.createdAt).toLocaleString()}</Typography>
                            <Typography>Updated At: {new Date(selectedTicket.ticketId.updatedAt).toLocaleString()}</Typography>
                            <Typography>Reopened: {selectedTicket.re_opened ? 'Yes' : 'No'}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for Feedback */}
            {isError && (
                <Snackbar
                    open={isError}
                    autoHideDuration={6000}
                    onClose={() => { }}
                    message="Error loading tickets!" // Customize as needed
                />
            )}
        </Box>
    );
};

export default AssignedTicket;