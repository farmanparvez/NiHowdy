import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getCurrencyPriceAPI, getBicoinPriceAPI, getCardDetaiailsAPI, getPopularDrugAPI,
    getRewardValueInYearAPI, rewardPercentBasedOnPriceAPI, emailDefautSavingCardAPI,
    newsletterEmailAPI,
    // getBlogAPI,
} from "../../service/homeAPI";
import { notificationHandler } from "../slice/globalSlice";
// import { CookieHandler } from "../../utils/cookieHandler";
import { getProfileSavingCardAPI } from "../../service/savingCardAPI";

export const getPopularDrugs = createAsyncThunk(
    "drug/getPopularDrugs",
    async (_, thunkAPI) => {
        try {
            return await getPopularDrugAPI();;
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getCurrencyPrice = createAsyncThunk(
    "access/getCurrencyPrice",
    async (data, thunkAPI) => {
        try {
            const res = await getCurrencyPriceAPI(data);
            const bitcoinPrice = await getBicoinPriceAPI(1);
            return { res, oneBitcoinPrice: bitcoinPrice?.data?.price }
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getCurrencyPricebyData = createAsyncThunk(
    "access/getCurrencyPricebyData",
    async (data, thunkAPI) => {
        try {
            const res = await getCurrencyPriceAPI(data);
            return res?.data
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getBicoinPrice = createAsyncThunk(
    "access/getBicoinPrice",
    async (data, thunkAPI) => {
        try {
            return await getBicoinPriceAPI(data);
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// export const getBlog = createAsyncThunk(
//     "access/getBlog",
//     async (_, thunkAPI) => {
//         try {
//             return await getBlogAPI();
//         } catch (error) {
//             const message = error?.response?.data?.message || error.toString();
//             thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

export const getCardDetaiails = createAsyncThunk(
    "card/getCardDetaiails",
    async (_, thunkAPI) => {
        try {
            // const auth = typeof window !== 'undefined' && localStorage.getItem('accessToken') || localStorage.getItem('googleToken')
            // let data
            // if (auth) {
            //     data = await getProfileSavingCardAPI()
            // } else {
            //     data = await getCardDetaiailsAPI();
            // }
            return await getCardDetaiailsAPI();
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getRewardValueInYear = createAsyncThunk(
    "card/getRewardValueInYear",
    async (_, thunkAPI) => {
        try {
            return await getRewardValueInYearAPI();
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const rewardPercentBasedOnPrice = createAsyncThunk(
    "instantReward/rewardPercentBasedOnPrice",
    async (_, thunkAPI) => {
        try {
            return await rewardPercentBasedOnPriceAPI();
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const emailDefautSavingCard = createAsyncThunk(
    "email/emailDefautSavingCard",
    async (data, thunkAPI) => {
        try {
            const res = await emailDefautSavingCardAPI(data);
            thunkAPI.dispatch(notificationHandler({ status: 'success', message: res.message }))
            return
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const newsletterEmail = createAsyncThunk(
    "new/newsletterEmail",
    async (data, thunkAPI) => {
        try {
            const res = await newsletterEmailAPI(data);
            thunkAPI.dispatch(notificationHandler({ status: 'success', message: res.message }))
            return
        } catch (error) {
            const message = error?.response?.data?.message || error.toString();
            thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
            return thunkAPI.rejectWithValue(message);
        }
    }
);
