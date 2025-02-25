import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, List, ListItem, ListItemText, Divider, Avatar, Chip, useMediaQuery, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Assignment, Build, CheckCircle, ChatBubble, CalendarToday, PauseCircle } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { ticket, isError, isLoading } = useSelector(state => state.ticket);

  const [ticketSummary, setTicketSummary] = useState([
    { status: 'Open', count: 0, icon: <Assignment color="error" /> },
    { status: 'In Progress', count: 0, icon: <Build color="primary" /> },
    { status: 'Resolved', count: 0, icon: <CheckCircle color="success" /> },
    { status: 'Hold', count: 0, icon: <PauseCircle color="warning" /> },
  ]);

  const [recentTickets, setRecentTickets] = useState([]);
  const [ticketTrends, setTicketTrends] = useState([]);
  const [dayFilter, setDayFilter] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    processTicketData(ticket);
  }, [ticket, dayFilter]);

  const processTicketData = (tickets) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const filteredTickets = tickets.filter(ticket => {
      const ticketDate = new Date(ticket.createdAt);
      ticketDate.setHours(0, 0, 0, 0);
      if (dayFilter === 0) {
        return ticketDate.getTime() === now.getTime();
      } else if (dayFilter === 'all') {
        return true;
      } else {
        const diffTime = Math.abs(now - ticketDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= dayFilter;
      }
    });

    const summary = {
      Open: 0,
      'In Progress': 0,
      Resolved: 0,
      Hold: 0
    };

    filteredTickets.forEach(ticket => {
      if (summary.hasOwnProperty(ticket.status)) {
        summary[ticket.status]++;
      }
    });

    setTicketSummary([
      { status: 'Open', count: summary.Open, icon: <Assignment color="error" /> },
      { status: 'In Progress', count: summary['In Progress'], icon: <Build color="primary" /> },
      { status: 'Resolved', count: summary.Resolved, icon: <CheckCircle color="success" /> },
      { status: 'Hold', count: summary.Hold, icon: <PauseCircle color="warning" /> },
    ]);

    setRecentTickets(filteredTickets.slice(0, 3).map(ticket => ({
      id: ticket._id,
      status: ticket.status,
      description: ticket.title
    }))); 


    const trends = [
      { name: 'Open', value: summary.Open },
      { name: 'In Progress', value: summary['In Progress'] },
      { name: 'Resolved', value: summary.Resolved },
      { name: 'Hold', value: summary.Hold },
    ];
    setTicketTrends(trends);
  };

  const upcomingMaintenance = [
    { id: 1, title: 'Server Maintenance', date: '2023-07-15', time: '22:00 - 23:00' },
    { id: 2, title: 'Software Update', date: '2023-07-20', time: '09:00 - 10:00' },
  ];

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(null);
  };

  const handleFilterChange = (event) => {
    setDayFilter(event.target.value);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, 
      paddingTop: { xs: '80px', sm: '100px', md: '120px' },
      backgroundColor: '#f5f5f5',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          User Dashboard
        </Typography>
        <FormControl variant="outlined" size="small">
          <InputLabel>Filter</InputLabel>
          <Select
            value={dayFilter}
            onChange={handleFilterChange}
            label="Filter"
          >
            <MenuItem value={0}>Today</MenuItem>
            <MenuItem value={1}>Last 24 hours</MenuItem>
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={30}>Last 30 days</MenuItem>
            <MenuItem value="all">All Time</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        Showing data for: {dayFilter === 0 ? 'Today' : dayFilter === 'all' ? 'All Time' : `Last ${dayFilter} days`}
      </Typography>

      <Grid container spacing={3}>
        {/* Ticket Summary */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', borderRadius: '15px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Ticket Summary</Typography>
            <Grid container spacing={2}>
              {ticketSummary.map((item) => (
                <Grid item xs={6} sm={3} key={item.status}>
                  <Card sx={{ bgcolor: '#f5f5f5', borderRadius: '10px', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                    <CardContent>
                      {item.icon}
                      <Typography variant="h5" sx={{ mt: 1 }}>{item.count}</Typography>
                      <Typography variant="body2">{item.status}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Ticket Trends Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', borderRadius: '15px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Ticket Trends</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketTrends}>
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

        {/* Upcoming Maintenance */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', borderRadius: '15px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Upcoming Maintenance</Typography>
            <List>
              {upcomingMaintenance.map((event) => (
                <React.Fragment key={event.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Date: {event.date}
                          </Typography>
                          {` — Time: ${event.time}`}
                        </React.Fragment>
                      }
                    />
                    <CalendarToday color="action" />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Tickets */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: '15px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Recent Tickets</Typography>
            <List>
              {recentTickets.map((ticket) => (
                <React.Fragment key={ticket.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`Ticket #${ticket.id}: ${ticket.description}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Status: 
                          </Typography>
                          {` ${ticket.status}`}
                        </React.Fragment>
                      }
                    />
                    <Chip 
                      label={ticket.status} 
                      color={
                        ticket.status === 'Open' ? 'error' : 
                        ticket.status === 'In Progress' ? 'primary' : 
                        ticket.status === 'Resolved' ? 'success' : 
                        'warning'
                      } 
                      size="small" 
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserDashboard;
