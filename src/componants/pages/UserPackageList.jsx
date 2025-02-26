import React, { useEffect } from "react";
import {  useSelector } from "react-redux";
import { Card, CardContent, Typography, Grid, CircularProgress, Container } from "@mui/material";

const UserPackageList = () => {
    const { packages, loading, error } = useSelector((state) => state.packages);

 

    return (
        <Container maxWidth="lg" sx={{ paddingTop: "80px", textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                Available Packages
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Grid container spacing={3}>
                    {packages.map((pkg) => (
                        <Grid item xs={12} sm={6} md={4} key={pkg._id}>
                            <Card 
                                sx={{ 
                                    boxShadow: 3, 
                                    borderRadius: 3, 
                                    textAlign: "center",
                                    transition: "0.3s",
                                    "&:hover": { boxShadow: 6 },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                        {pkg.name}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: "bold", my: 1 }}>
                                        ${pkg.amount}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        Duration: {pkg.duration} Days
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default UserPackageList;
