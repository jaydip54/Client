import React from "react";
import { useSelector } from "react-redux";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Button, CircularProgress } from "@mui/material";


const UserParkingList = () => {
    const { spaces, loading, error } = useSelector((state) => state.parkingSpaces);


    return (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, mt: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="parking spaces table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        spaces.map((space) => (
                            <TableRow key={space._id}>
                                <TableCell>{space.name}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};



export default UserParkingList
