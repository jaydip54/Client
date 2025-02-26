import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, CircularProgress, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreatePackage from "./CreatePackages";
import { deletePackage } from "../../redux/slices/package";
import { TableContainer, Paper } from "@mui/material";

const PackageList = () => {
    const dispatch = useDispatch();
    const { packages, loading, error } = useSelector((state) => state.packages);
    let { token } = useSelector((state) => state.auth);

    const handleDelete = (id) => {
        dispatch(deletePackage({ id, token }));
    };

    return (
        <div style={{ paddingTop: "80px", padding: "20px" }}>
            <CreatePackage />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", color: "#333" }}>
                Packages
            </Typography>
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <CircularProgress />
                </div>
            ) : error ? (
                <Typography color="error" align="center">
                    Error: {error}
                </Typography>
            ) : (
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="packages table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Duration (Days)</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packages.map((pkg, index) => (
                                <TableRow
                                    key={pkg._id}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                                        "&:hover": { backgroundColor: "#e3f2fd" },
                                        transition: "background 0.3s ease-in-out"
                                    }}
                                >
                                    <TableCell sx={{ fontSize: "15px" }}>{pkg.name}</TableCell>
                                    <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}>${pkg.amount}</TableCell>
                                    <TableCell sx={{ fontSize: "15px" }}>{pkg.duration} Days</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDelete(pkg._id)}
                                            sx={{ boxShadow: 2, borderRadius: "8px", textTransform: "none" }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default PackageList;
