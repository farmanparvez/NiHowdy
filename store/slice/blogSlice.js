import { createSlice } from "@reduxjs/toolkit";
import { getBlogs, getBlogsDetails } from "../actions/Blog";

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        isLoading: false,
        isError: false,
        blogs: [],
        blogDetails: null
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = action?.payload
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = false
            })
            .addCase(getBlogsDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogsDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogDetails = action?.payload
            })
            .addCase(getBlogsDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = false
            })
    },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
