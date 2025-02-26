import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Box } from "@mui/material";
import { createPackage } from "../../redux/slices/package";

const CreatePackage = () => {
    let { type, token } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({ name: "", amount: "", duration: "" });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPackage({ data: formData, token: token }));
        setFormData({ name: "", amount: "", duration: "" });
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
            <h2>Create Package</h2>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
                <TextField fullWidth type="number" label="Amount" name="amount" value={formData.amount} onChange={handleChange} margin="normal" required />
                <TextField fullWidth type="number" label="Duration (Days)" name="duration" value={formData.duration} onChange={handleChange} margin="normal" required />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Add Package
                </Button>
            </form>
        </Box>
    );
};

export default CreatePackage;
