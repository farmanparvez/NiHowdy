import { createAsyncThunk } from "@reduxjs/toolkit";
import { notificationHandler } from "../slice/globalSlice";
import { getUserBitcoinTotalRewardAmountAPI, getWithDrawHistoryAPI, withDrawBitcoinAPI } from "../../service/rewardAPI";

export const getUserBitcoinTotalRewardAmount = createAsyncThunk(
    "reward/getUserBitcoinTotalRewardAmount",
    async (_, thunkAPI) => {
        try {
            return await getUserBitcoinTotalRewardAmountAPI()
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getwithDrawHistory = createAsyncThunk(
    "reward/withDrawHistory",
    async (data, thunkAPI) => {
        try {
            return await getWithDrawHistoryAPI(data);
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const withDrawBitcoin = createAsyncThunk(
    "reward/withDrawBitcoin",
    async (data, thunkAPI) => {
        try {
            const res = await withDrawBitcoinAPI(data)
            console.log(thunkAPI.getState()?.reward?.pagination);
            thunkAPI.dispatch(getwithDrawHistory(thunkAPI.getState()?.reward?.pagination))
            thunkAPI.dispatch(getUserBitcoinTotalRewardAmount())
            return res
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);
