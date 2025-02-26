import React from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Card,
    CardContent,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import {
    DirectionsCar,
    LocalParking,
    CheckCircle,
    Block,
    Update,
} from "@mui/icons-material";

const ParkingDashboard = ({ isSidebarVisible }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const parkingSummary = [
        { status: "Available", count: 150, icon: <LocalParking color="success" /> },
        { status: "Occupied", count: 80, icon: <DirectionsCar color="error" /> },
        { status: "Reserved", count: 20, icon: <CheckCircle color="primary" /> },
        { status: "Blocked", count: 5, icon: <Block color="warning" /> },
        { status: "Maintenance", count: 2, icon: <Update color="info" /> },
    ];

    const parkingTrends = [
        { name: "Jan", Available: 120, Occupied: 70, Reserved: 15, Blocked: 3 },
        { name: "Feb", Available: 130, Occupied: 75, Reserved: 18, Blocked: 4 },
        { name: "Mar", Available: 140, Occupied: 80, Reserved: 20, Blocked: 5 },
        { name: "Apr", Available: 150, Occupied: 85, Reserved: 22, Blocked: 6 },
        { name: "May", Available: 160, Occupied: 90, Reserved: 25, Blocked: 7 },
        { name: "Jun", Available: 170, Occupied: 95, Reserved: 28, Blocked: 8 },
    ];

    const parkingDistribution = [
        { name: "Car", value: 180 },
        { name: "Motorcycle", value: 50 },
        { name: "Van", value: 30 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 3 },
                ml: isSidebarVisible ? "240px" : "0",
                pt: { xs: "60px", sm: "80px", md: "100px" },
                backgroundColor: "#f9f9f9",
                transition: "margin-left 0.3s",
                maxWidth: "1200px",
                mx: "auto",
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
                Parking Dashboard
            </Typography>

            <Grid container spacing={3}>
                {parkingSummary.map((item, index) => (
                    <Grid item xs={12} sm={6} md={2.4} key={index}>
                        <Card sx={{ textAlign: "center", p: 2, borderRadius: "12px", boxShadow: 3 }}>
                            {item.icon}
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>{item.count}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {item.status}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3} mt={2}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: "15px" }}>
                        <Typography variant="h6" gutterBottom>
                            Parking Trends
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={parkingTrends}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Available" fill="#4caf50" />
                                <Bar dataKey="Occupied" fill="#f44336" />
                                <Bar dataKey="Reserved" fill="#2196f3" />
                                <Bar dataKey="Blocked" fill="#ff9800" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: "15px" }}>
                        <Typography variant="h6" gutterBottom>
                            Vehicle Type Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={parkingDistribution}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {parkingDistribution.map((entry, index) => (
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
        </Box>
    );
};

export default ParkingDashboard;
