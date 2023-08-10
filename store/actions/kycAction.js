import { createAsyncThunk } from "@reduxjs/toolkit";
import { notificationHandler } from "../slice/globalSlice";
import { getSdKTokenAPI, createCheckAPI, getKycStatusAPI } from "../../service/kycAPI";

export const getSdKToken = createAsyncThunk(
    "kyc/getSdKToken",
    async (data, thunkAPI) => {
        try {
            return await getSdKTokenAPI(data);
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createCheck = createAsyncThunk(
    "kyc/createCheck",
    async (data, thunkAPI) => {
        try {
            const res = await createCheckAPI(data);
            thunkAPI.dispatch(notificationHandler({ status: 'success', message: res.message }))
            thunkAPI.dispatch(kycStatus())
            return res
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const kycStatus = createAsyncThunk(
    "kyc/kycStatus",
    async (data, thunkAPI) => {
        try {
            const res = await getKycStatusAPI(data);
            return res
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);



