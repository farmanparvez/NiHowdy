import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileSavingCardAPI, emailSavingCardAPI } from "../../service/savingCardAPI";
import { notificationHandler } from "../slice/globalSlice";

export const getProfileSavingCard = createAsyncThunk(
  "access/getProfile",
  async (_, thunkAPI) => {
    try {
      return await getProfileSavingCardAPI();
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendEmailSavingCard = createAsyncThunk(
  "email/emailSavingCard",
  async (data, thunkAPI) => {
    try {
      const res = await emailSavingCardAPI(data);
      thunkAPI.dispatch(notificationHandler({ status: 'success', message: res.message }))
      return 
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);


