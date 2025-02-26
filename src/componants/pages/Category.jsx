import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addCategory,
    updateCategory,
    deleteCategory,
    fetchCategories
} from "../../redux/slices/category";

import {
    Box, Typography, List, ListItem, IconButton, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, MenuItem, CircularProgress
} from "@mui/material";

import { Delete, Edit, Add } from "@mui/icons-material";

const CategoryManagement = () => {
    const dispatch = useDispatch();
    const { categories, isLoading, error } = useSelector((state) => state.category);
    const { token } = useSelector((state) => state.auth);
    console.log("🚀 ~ CategoryManagement ~ token:", token)

    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categoryData, setCategoryData] = useState({ Name: "", Status: 1 });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveCategory = async () => {
        if (!token) return;

        if (editMode) {
            dispatch(updateCategory({ id: selectedCategoryId, updatedData: categoryData, token }));
        } else {
            dispatch(addCategory({ categoryData, token }));
        }

        handleCloseDialog();
    };

    const handleEditCategory = (category) => {
        setCategoryData({ ...category });
        setSelectedCategoryId(category._id);
        setEditMode(true);
        setOpenDialog(true);
    };

    const handleDeleteCategory = (id) => {
        if (!token) return;

        if (window.confirm("Are you sure you want to delete this category?")) {
            dispatch(deleteCategory({ id, token }));
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditMode(false);
        setSelectedCategoryId(null);
        setCategoryData({ Name: "", Status: 1 });
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: "0 auto", paddingTop: "80px" }}>
            <Typography variant="h4">Category Management</Typography>

            {isLoading ? (
                <CircularProgress sx={{ mt: 2 }} />
            ) : error ? (
                <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
            ) : (
                <List sx={{ mt: 2 }}>
                    {categories.map((category) => (
                        <ListItem key={category._id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <Typography variant="h6">{category.Name}</Typography>
                                <Typography>Status: {category.Status === 1 ? "Active" : "Inactive"}</Typography>
                            </Box>
                            <Box>
                                <IconButton color="primary" onClick={() => handleEditCategory(category)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => handleDeleteCategory(category._id)}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}

            <Button variant="contained" color="primary" startIcon={<Add />} sx={{ mt: 2 }} onClick={() => setOpenDialog(true)}>
                Add Category
            </Button>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editMode ? "Edit Category" : "Add New Category"}</DialogTitle>
                <DialogContent>
                    <TextField
                        name="Name"
                        label="Category Name"
                        fullWidth
                        margin="dense"
                        value={categoryData.Name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        select
                        name="Status"
                        label="Status"
                        fullWidth
                        margin="dense"
                        value={categoryData.Status}
                        onChange={handleInputChange}
                    >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>Inactive</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveCategory} variant="contained">
                        {editMode ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CategoryManagement;
