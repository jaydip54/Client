import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, categoryEndpoint } from "../../Atoms/constatnt";

const API_URL = `${baseUrl}${categoryEndpoint}`;

// **Fetch Categories**
export const fetchCategories = createAsyncThunk("category/fetchCategories", async ({ token }, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `${token}` },
        });
        return response.data.categories;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
    }
});

// **Add Category**
export const addCategory = createAsyncThunk("category/addCategory", async ({ categoryData, token }, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, categoryData, {
            headers: { Authorization: `${token}` },
        });
        return response.data.category;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to add category");
    }
});

// **Update Category**
export const updateCategory = createAsyncThunk("category/updateCategory", async ({ id, updatedData, token }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}${id}`, updatedData, {
            headers: { Authorization: `${token}` },
        });
        return response.data.updatedCategory;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update category");
    }
});

// **Delete Category**
export const deleteCategory = createAsyncThunk("category/deleteCategory", async ({ id, token }, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}${id}`, {
            headers: { Authorization: `${token}` },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete category");
    }
});

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // **Fetch Categories**
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // **Add Category**
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.error = action.payload;
            })

            // **Update Category**
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.categories = state.categories.map(cat =>
                    cat._id === action.payload._id ? action.payload : cat
                );
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.error = action.payload;
            })

            // **Delete Category**
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(cat => cat._id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default categorySlice.reducer;
