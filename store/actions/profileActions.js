import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileAPI } from "../../service/ProfileAPI";
import { notificationHandler } from "../slice/globalSlice";

export const getProfile = createAsyncThunk(
  "access/getProfile",
  async (data, thunkAPI) => {
    try {
      return await getProfileAPI(data);
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);


