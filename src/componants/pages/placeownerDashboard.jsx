import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, List, ListItem, ListItemText, Divider, Chip, useMediaQuery, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LocalParking, DirectionsCar, MonetizationOn, EventAvailable } from '@mui/icons-material';

const ParkingOwnerDashboard = ({ isSidebarVisible }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Static Data
  const parkingSummary = [
    { status: 'Available', count: 25, icon: <LocalParking color="primary" /> },
    { status: 'Occupied', count: 75, icon: <DirectionsCar color="error" /> },
    { status: 'Revenue', count: '$12,500', icon: <MonetizationOn color="success" /> },
    { status: 'Upcoming Reservations', count: 15, icon: <EventAvailable color="warning" /> },
  ];

  const occupancyTrends = [
    { name: 'Jan', Occupied: 60, Available: 40 },
    { name: 'Feb', Occupied: 70, Available: 30 },
    { name: 'Mar', Occupied: 65, Available: 35 },
    { name: 'Apr', Occupied: 80, Available: 20 },
  ];

  const recentTransactions = [
    { id: 'TXN001', amount: '$10', time: '10:30 AM' },
    { id: 'TXN002', amount: '$15', time: '11:45 AM' },
    { id: 'TXN003', amount: '$20', time: '1:00 PM' },
    { id: 'TXN004', amount: '$25', time: '3:15 PM' },
  ];

  return (
    <Box sx={{
      p: { xs: 1, sm: 2, md: 3 },
      marginLeft: isSidebarVisible ? '240px' : '0',
      paddingTop: { xs: '60px', sm: '80px', md: '100px' },
      backgroundColor: '#f5f5f5',
      transition: 'margin-left 0.3s',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Parking Owner Dashboard
      </Typography>

      <Grid container spacing={2}>
        {/* Parking Summary */}
        {parkingSummary.map((item) => (
          <Grid item xs={6} sm={3} key={item.status}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {item.icon}
                <Typography variant="h4">{item.count}</Typography>
                <Typography variant="body2">{item.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Occupancy Trends */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Occupancy Trends</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={occupancyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Occupied" fill="#ff5252" />
                <Bar dataKey="Available" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
            <List>
              {recentTransactions.map((txn) => (
                <React.Fragment key={txn.id}>
                  <ListItem>
                    <ListItemText primary={txn.id} secondary={`Amount: ${txn.amount} | Time: ${txn.time}`} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParkingOwnerDashboard;