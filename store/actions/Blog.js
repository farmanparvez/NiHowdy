import { createAsyncThunk } from "@reduxjs/toolkit";
import { notificationHandler } from "../slice/globalSlice";
import { blogsAPI, blogsDetailByIdAPI } from "../../service/blogAPI";

export const getBlogs = createAsyncThunk(
    "blog/getBlogs",
    async (_, thunkAPI) => {
        try {
            return await blogsAPI()
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getBlogsDetails = createAsyncThunk(
    "blog/getBlogsDetails",
    async (id, thunkAPI) => {
        try {
            return await blogsDetailByIdAPI(id)
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);


