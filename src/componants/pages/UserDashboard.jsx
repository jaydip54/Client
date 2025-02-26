import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, List, ListItem, ListItemText, Divider, Chip, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DirectionsCar, Event, CheckCircle, Warning, LocalParking } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserDashboard = () => {
  const theme = useTheme();
  const [dayFilter, setDayFilter] = useState(0);
  const [error, setError] = useState(null);

  const parkingSummary = [
    { status: 'Available', count: 12, icon: <LocalParking color="success" /> },
    { status: 'Occupied', count: 8, icon: <DirectionsCar color="error" /> },
    { status: 'Reserved', count: 5, icon: <Event color="primary" /> },
    { status: 'Maintenance', count: 2, icon: <Warning color="warning" /> },
  ];

  const recentTransactions = [
    { id: 201, status: 'Completed', description: 'Parking slot #12', amount: '$5.00' },
    { id: 202, status: 'Ongoing', description: 'Parking slot #5', amount: '$3.00' },
    { id: 203, status: 'Reserved', description: 'Parking slot #8', amount: '$2.50' },
  ];

  const occupancyTrends = [
    { name: 'Available', value: 12 },
    { name: 'Occupied', value: 8 },
    { name: 'Reserved', value: 5 },
    { name: 'Maintenance', value: 2 },
  ];

  const upcomingReservations = [
    { id: 1, title: 'Slot #7 Reserved', date: '2025-03-02', time: '10:00 - 12:00' },
    { id: 2, title: 'Slot #3 Reserved', date: '2025-03-05', time: '15:00 - 17:00' },
  ];

  const handleFilterChange = (event) => {
    setDayFilter(event.target.value);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', paddingTop: '80px', maxWidth: '1200px', margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Parking Dashboard</Typography>
        <FormControl variant="outlined" size="small">
          <InputLabel>Filter</InputLabel>
          <Select value={dayFilter} onChange={handleFilterChange} label="Filter">
            <MenuItem value={0}>Today</MenuItem>
            <MenuItem value={1}>Last 24 hours</MenuItem>
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={30}>Last 30 days</MenuItem>
            <MenuItem value="all">All Time</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: '15px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Parking Summary</Typography>
            <Grid container spacing={2}>
              {parkingSummary.map((item) => (
                <Grid item xs={6} sm={3} key={item.status}>
                  <Card sx={{ bgcolor: '#f5f5f5', borderRadius: '10px' }}>
                    <CardContent>
                      {item.icon}
                      <Typography variant="h5">{item.count}</Typography>
                      <Typography variant="body2">{item.status}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: '15px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Occupancy Trends</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={occupancyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: '15px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Upcoming Reservations</Typography>
            <List>
              {upcomingReservations.map((event) => (
                <React.Fragment key={event.id}>
                  <ListItem>
                    <ListItemText primary={event.title} secondary={`Date: ${event.date} - Time: ${event.time}`} />
                    <Event color="action" />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: '15px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Transactions</Typography>
            <List>
              {recentTransactions.map((transaction) => (
                <React.Fragment key={transaction.id}>
                  <ListItem>
                    <ListItemText primary={`Transaction #${transaction.id}: ${transaction.description}`} secondary={`Status: ${transaction.status} - Amount: ${transaction.amount}`} />
                    <Chip label={transaction.status} color={transaction.status === 'Completed' ? 'success' : transaction.status === 'Ongoing' ? 'primary' : 'warning'} size="small" />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

export default UserDashboard;