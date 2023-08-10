import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStateAPI } from "../../service/accountAPI";
import { notificationHandler } from "../slice/globalSlice";

export const getState = createAsyncThunk(
    "account/getState",
    async (_, thunkAPI) => {
        try {
            const res = await getStateAPI();
            return res
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);
