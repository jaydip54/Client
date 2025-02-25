import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, List, ListItem, ListItemText, Divider, Avatar, Chip, useMediaQuery, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Assignment, Build, CheckCircle, PauseCircle, Notifications, Speed, TrendingUp, People, AccessTime, ChatBubble, Update } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const SupervisorDashboard = ({ isSidebarVisible }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const ticket = useSelector(state => state.supervisorticket.departmentticket.ticket);
  const isLoading = useSelector(state => state.supervisorticket.departmentticket.isLoading);
  const isError = useSelector(state => state.supervisorticket.departmentticket.isError);

  const [ticketSummary, setTicketSummary] = useState([
    { status: 'Open', count: 0, icon: <Assignment color="error" /> },
    { status: 'In Progress', count: 0, icon: <Build color="primary" /> },
    { status: 'Resolved', count: 0, icon: <CheckCircle color="success" /> },
    { status: 'Hold', count: 0, icon: <PauseCircle color="warning" /> },
    { status: 'Re-opened', count: 0, icon: <Update color="info" /> },
  ]);


  const [ticketTrends, setTicketTrends] = useState([]);
  const [ticketDistribution, setTicketDistribution] = useState([]);
  const [departmentDistribution, setDepartmentDistribution] = useState([]); // Added department distribution state
  const [recentTickets, setRecentTickets] = useState([]);
  const [dayFilter, setDayFilter] = useState('0');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  useEffect(() => {
    if (isError) {
      setSnackbar({ open: true, message: isError, severity: 'error' });
    }
    processTicketData(ticket);
  }, [ticket, dayFilter, isError]);

  const processTicketData = (ticketData) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const trends = ticketData.reduce((acc, ticket) => {
      const month = new Date(ticket.createdAt).toLocaleString('default', { month: 'short' });
      if (!acc[month]) {
        acc[month] = { Open: 0, 'In Progress': 0, Resolved: 0, Hold: 0 };
      }
      acc[month][ticket.status]++;
      return acc;
    }, {});
    setTicketTrends(Object.entries(trends).map(([name, data]) => ({ name, ...data })));

    const filteredTickets = ticketData.filter(ticket => {
      if (dayFilter === 'all') return true;
      const ticketDate = new Date(ticket.createdAt);
      ticketDate.setHours(0, 0, 0, 0);
      const diffTime = Math.abs(now - ticketDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= parseInt(dayFilter);
    });

    const summary = filteredTickets.reduce((acc, ticket) => {
      const statusIndex = acc.findIndex(item => item.status === ticket.status);
      if (statusIndex !== -1) {
        acc[statusIndex].count++;
      }
      return acc;
    }, ticketSummary.map(item => ({ ...item, count: 0 })));
    setTicketSummary(summary);

    const distribution = filteredTickets.reduce((acc, ticket) => {
      acc[ticket.issueType] = (acc[ticket.issueType] || 0) + 1;
      return acc;
    }, {});
    setTicketDistribution(Object.entries(distribution).map(([name, value]) => ({ name, value })));

    const departmentDist = filteredTickets.reduce((acc, ticket) => {
      acc[ticket.creator_department] = (acc[ticket.creator_department] || 0) + 1;
      return acc;
    }, {});
    setDepartmentDistribution(Object.entries(departmentDist).map(([name, value]) => ({ name, value })));

    const sortedTickets = filteredTickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setRecentTickets(sortedTickets.slice(0, 5)); // Changed to show only 5 recent tickets
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Dashboard
        </Typography>
        <FormControl variant="outlined" size="small">
          <InputLabel>Filter</InputLabel>
          <Select
            value={dayFilter}
            onChange={(e) => setDayFilter(e.target.value)}
            label="Filter"
          >
            <MenuItem value="all">All Time</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="1">Last 24 hours</MenuItem>
            <MenuItem value="0">Today</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {/* Ticket Summary */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', borderRadius: '15px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>Ticket Summary</Typography>
            <Grid container spacing={2}>
              {ticketSummary.map((item, index) => (
                <Grid item xs={3} key={item.status}>
                  <Card sx={{ bgcolor: index === 0 ? '#e3f2fd' : index === 1 ? '#fff3e0' : index === 2 ? '#e8f5e9' : '#fce4ec', borderRadius: '10px', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                    <CardContent>
                      {item.icon}
                      <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>{item.count}</Typography>
                      <Typography variant="body2">{item.status}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Performance Charts */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', borderRadius: '15px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>Ticket Trends</Typography>
            <ResponsiveContainer width="100%" height={isSmallScreen ? 200 : 300}>
              <BarChart data={ticketTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Open" fill="#2196f3" />
                <Bar dataKey="In Progress" fill="#ff9800" />
                <Bar dataKey="Resolved" fill="#4caf50" />
                <Bar dataKey="Hold" fill="#f50057" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Ticket Distribution */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', borderRadius: '15px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>Issue Type Ticket Distribution</Typography>
            <ResponsiveContainer width="100%" height={isSmallScreen ? 200 : 300}>
              <PieChart>
                <Pie
                  data={ticketDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={isSmallScreen ? 60 : 80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ticketDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Department Distribution */}
        {/* <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', borderRadius: '15px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>Department Ticket Distribution</Typography>
            <ResponsiveContainer width="100%" height={isSmallScreen ? 200 : 300}>
              <PieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={isSmallScreen ? 60 : 80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart> 
            </ResponsiveContainer>
          </Paper>
        </Grid> */}

        {/* Recent Tickets */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', borderRadius: '15px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' }, mb: 2 }}>Recent Tickets</Typography>
            <List>
              {recentTickets.map((ticket) => (
                <React.Fragment key={ticket._id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="body1" color="text.primary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                            Ticket ID: {ticket._id}
                          </Typography>
                          {' — '}
                          <Chip
                            label={ticket.status}
                            color={ticket.status === 'Open' ? 'error' : ticket.status === 'In Progress' ? 'primary' : ticket.status === 'Resolved' ? 'success' : 'warning'}
                            size="small"
                          />
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="text.primary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                            {ticket.title}
                          </Typography>
                          {' — '}
                          <Chip
                            label={ticket.issueType}
                            size="small"
                            variant="outlined"
                          />
                          {' — '}
                          <Typography component="span" variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                            Created: {new Date(ticket.createdAt).toLocaleString()}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Paper elevation={3} sx={{ padding: 2, backgroundColor: snackbar.severity === 'error' ? 'gray' : '#4caf50', color: 'white' }}>
          <Typography>{snackbar.message}</Typography>
        </Paper>
      </Snackbar>
    </Box>
  );
};

export default SupervisorDashboard;
