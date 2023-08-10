
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRawTransactionAPI } from "../../service/prescriptionHistory";
import { notificationHandler } from "../slice/globalSlice";

export const getRawTransaction = createAsyncThunk(
    "prescriptionHistory/getRawTransaction",
    async (data, thunkAPI) => {
        try {
            const res = await getRawTransactionAPI(data);
            return res
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);
