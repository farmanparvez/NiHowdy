import { createAsyncThunk } from "@reduxjs/toolkit";
import { qrSignInAPI } from "../../service/qrAuthAPI"
import { notificationHandler } from "../slice/globalSlice";

export const qrAuth = createAsyncThunk(
    "access/qrAuth",
    async (data, thunkAPI) => {
        try {
            return await qrSignInAPI(data);
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);


