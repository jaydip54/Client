import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, List, ListItem, ListItemText, Divider, Chip, CircularProgress, Snackbar, Alert, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Assignment, Build, CheckCircle } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const TechnicianDashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Getting assigned tickets from Redux
  const { assigned, isLoading, isError } = useSelector((state) => state.assigned);

  // States for chart data
  const [pieData, setPieData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    if (assigned.length > 0) {
      // Process pie chart data
      const issueTypeCount = assigned.reduce((acc, ticket) => {
        const issueType = ticket.ticketId.issueType;
        acc[issueType] = (acc[issueType] || 0) + 1;
        return acc;
      }, {});

      const formattedPieData = Object.entries(issueTypeCount).map(([key, value]) => ({
        name: key,
        value
      }));
      setPieData(formattedPieData);

      // Process weekly performance data
      const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      const weeklyStats = weekDays.map(day => {
        return {
          name: day,
          Open: assigned.filter(ticket =>
            ticket.ticketId.status === 'Open' &&
            new Date(ticket.ticketId.createdAt).toLocaleString('en-us', { weekday: 'short' }) === day
          ).length,
          InProgress: assigned.filter(ticket =>
            ticket.ticketId.status === 'In Progress' &&
            new Date(ticket.ticketId.createdAt).toLocaleString('en-us', { weekday: 'short' }) === day
          ).length,
          Resolved: assigned.filter(ticket =>
            ticket.ticketId.status === 'Resolved' &&
            new Date(ticket.ticketId.createdAt).toLocaleString('en-us', { weekday: 'short' }) === day
          ).length
        };
      });
      setWeeklyData(weeklyStats);
    }
  }, [assigned]);

  useEffect(() => {
    if (isError) {
      setOpenSnackbar(true);
    }
  }, [isError]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, paddingTop: { xs: '60px', sm: '80px', md: '100px' }, backgroundColor: '#f5f5f5', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        Technician Dashboard
      </Typography>

      <Grid container spacing={2}>
        {/* Ticket Summary */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              height: '100%',
              borderRadius: '15px',
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              }}
            >
              Ticket Summary
            </Typography>
            <Grid container spacing={2}>
              {['Open', 'In Progress', 'Resolved', 'Hold', 'Re-opened'].map((status) => {
                const count = assigned.filter((ticket) => ticket.ticketId.status === status).length;
                const color =
                  status === 'Open' ? '#e3f2fd' :
                    status === 'In Progress' ? '#fff3e0' :
                      status === 'Resolved' ? '#e8f5e9' :
                        status === 'Hold' ? '#f3e5f5' :
                          '#fbe9e7';
                const icon =
                  status === 'Open' ? (
                    <Assignment color="primary" sx={{ fontSize: { xs: 30, sm: 40 } }} />
                  ) : status === 'In Progress' ? (
                    <Build color="warning" sx={{ fontSize: { xs: 30, sm: 40 } }} />
                  ) : status === 'Resolved' ? (
                    <CheckCircle color="success" sx={{ fontSize: { xs: 30, sm: 40 } }} />
                  ) : status === 'Hold' ? (
                    <Assignment color="secondary" sx={{ fontSize: { xs: 30, sm: 40 } }} />
                  ) : (
                    <Assignment color="error" sx={{ fontSize: { xs: 30, sm: 40 } }} />
                  );

                return (
                  <Grid item xs={6} sm={4} key={status}>
                    <Card
                      sx={{
                        bgcolor: color,
                        borderRadius: '10px',
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.05)' },
                      }}
                    >
                      <CardContent>
                        {icon}
                        <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                          {count}
                        </Typography>
                        <Typography variant="body2">{status}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Grid>

        {/* Performance Charts */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', borderRadius: '15px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>Weekly Performance</Typography>
            <ResponsiveContainer width="100%" height={isSmallScreen ? 200 : 300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Open" fill="#8884d8" />
                <Bar dataKey="InProgress" fill="#82ca9d" />
                <Bar dataKey="Resolved" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Assigned Tickets */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', borderRadius: '15px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>Assigned Tickets</Typography>
            <List>
              {assigned.map((ticket, index) => (
                <React.Fragment key={ticket._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`Ticket #${ticket.ticketId._id}`}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {ticket.ticketId.description}
                          </Typography>
                          <br />
                          <Chip label={ticket.ticketId.status} color={ticket.ticketId.status === 'Open' ? 'error' : ticket.ticketId.status === 'In Progress' ? 'warning' : 'success'} size="small" />
                          <Chip label={ticket.ticketId.priority} color={ticket.ticketId.priority === 'High' ? 'error' : ticket.ticketId.priority === 'Medium' ? 'warning' : 'info'} size="small" sx={{ ml: 1 }} />
                        </>
                      }
                    />
                  </ListItem>
                  {index < assigned.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Ticket Types */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', borderRadius: '15px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>Ticket Types</Typography>
            <ResponsiveContainer width="100%" height={isSmallScreen ? 200 : 300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Error Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Error loading assigned tickets!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TechnicianDashboard;
