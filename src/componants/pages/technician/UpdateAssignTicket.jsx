import React, { useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';

const UpdateAssignTicket = () => {

  // const { assigned }

  const [status, setStatus] = useState(ticket.status);
  const [assignedTechnician, setAssignedTechnician] = useState(ticket.technician);

  const technicians = [
    { id: 'tech1', name: 'Technician A' },
    { id: 'tech2', name: 'Technician B' },
    { id: 'tech3', name: 'Technician C' },
  ];

  const handleUpdate = () => {
    // Simulate updating ticket data
    console.log(`Updated Ticket ${ticket.id}: Status - ${status}, Technician - ${assignedTechnician}`);
    alert(`Ticket ${ticket.id} updated successfully!`);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Update Assigned Ticket
      </Typography>
      <Typography variant="subtitle1">Ticket ID: {ticket.id}</Typography>
      <Typography variant="body1" gutterBottom>
        Title: {ticket.title}
      </Typography>

      {/* Status Dropdown */}
      <TextField
        select
        label="Update Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Open">Open</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Closed">Closed</MenuItem>
      </TextField>

      {/* Technician Dropdown */}
      <TextField
        select
        label="Assign Technician"
        value={assignedTechnician}
        onChange={(e) => setAssignedTechnician(e.target.value)}
        fullWidth
        margin="normal"
      >
        {technicians.map((tech) => (
          <MenuItem key={tech.id} value={tech.name}>
            {tech.name}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        fullWidth
        sx={{ marginTop: '20px' }}
      >
        Update Ticket
      </Button>
    </Box>
  );
};

export default UpdateAssignTicket;
