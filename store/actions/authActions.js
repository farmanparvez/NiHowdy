import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signUpAPI,
  signInAPI,
  resendEmailAPI,
  profileAPI,
  forgetPasswordAPI,
  verifyOtpForgotPasswordAPI,
  resetPasswordAPI,
  getCurrentUserAPI,
  logoutAPI,
  getLoginDeatilsAPI
} from "../../service/authAPI";
import { BACKEND_API_URL } from "../../utils/enviroment";
import { expiresIn, NIHDYDTL, ACCESSTOKEN, GOOGLETOKEN } from "../../utils/enviroment";
import { setFormData } from "../slice/authSlice";
import { notificationHandler } from "../slice/globalSlice";
import { getCardDetaiails } from "./homeMedicineAction";

export const googleSignUp = createAsyncThunk(
  "auth/googleSignUp",
  async (_, thunkAPI) => {
    try {
      window.open(`${BACKEND_API_URL}/api/user/auth/google`, "_self");
      return;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const facebookSignUp = createAsyncThunk(
  "auth/facebookSignUp",
  async (_, thunkAPI) => {
    try {
      window.open(`${BACKEND_API_URL}/api/user/auth/facebook`, "_self");
      return;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/SignUp",
  async ({ values, navigate }, thunkAPI) => {
    try {
      const res = await signUpAPI(values);
      thunkAPI.dispatch(notificationHandler({ status: 'success', message: res.message }))
      navigate("/confirmation");
      return res;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ values, navigate }, thunkAPI) => {
    try {
      const res = await signInAPI(values);
      console.log("res", JSON.stringify(res));
      console.log("NIHDYDTL", NIHDYDTL);
      console.log("expiresIn", expiresIn);
      localStorage.setItem(NIHDYDTL, JSON.stringify(res))
      if (res?.token) localStorage.setItem(ACCESSTOKEN, res?.token)
      if (!res?.email_verified) {
        localStorage.setItem("resendEmailToken", res?.verification_email_token);
        localStorage.setItem("email", res?.email);
        return navigate("/confirmation")
      };
      return res;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (navigate, thunkAPI) => {
    try {
      localStorage.removeItem(ACCESSTOKEN);
      localStorage.removeItem("isUpdatedProfile");
      localStorage.removeItem(NIHDYDTL);
      thunkAPI.dispatch(getCardDetaiails())
      await logoutAPI()
      navigate("/");
      return;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutGoogle = createAsyncThunk(
  "auth/logoutGoogle",
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem(ACCESSTOKEN);
      localStorage.removeItem(GOOGLETOKEN);
      localStorage.removeItem("isUpdatedProfile");
      localStorage.removeItem(NIHDYDTL);
      window.open(`${BACKEND_API_URL}/api/user/api/logout`, "_self");
      return;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (data, thunkAPI) => {
    try {
      const res = await forgetPasswordAPI(data);
      thunkAPI.dispatch(setFormData(data));
      thunkAPI.dispatch(notificationHandler({ status: 'success', message: res.message }))
      return;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifyOtpForgotPassword = createAsyncThunk(
  "auth/verifyOtpForgotPassword",
  async (data, thunkAPI) => {
    try {
      const res = await verifyOtpForgotPasswordAPI(data);
      thunkAPI.dispatch(notificationHandler({ status: 'success', message: res.message }))
      return;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      const res = await resetPasswordAPI(data);
      thunkAPI.dispatch(notificationHandler({ status: 'success', message: res.message }))
      return;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resendEmail = createAsyncThunk(
  "auth/resendEmail",
  async (_, thunkAPI) => {
    try {
      const res = await resendEmailAPI();
      thunkAPI.dispatch(notificationHandler({ status: 'success', message: res.message }))
      return;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const profile = createAsyncThunk(
  "auth/profile",
  async ({ formData, navigate }, thunkAPI) => {
    try {
      const res = await profileAPI(formData);
      thunkAPI.dispatch(notificationHandler({ status: 'success', message: res.message }))
      const data = localStorage.getItem(NIHDYDTL) ? JSON.parse(localStorage.getItem(NIHDYDTL)) : ''
      console.log("profilesiders", data);
      const val = { ...data, is_profile_updated: res?.is_profile_updated, first_name: res?.first_name, last_name: res?.last_name }
      localStorage.setItem(NIHDYDTL, JSON.stringify(val))
      // thunkAPI.dispatch(getCurrentUser())
      // navigate("/account")
      return;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const res = await getCurrentUserAPI()
      if (res?.data) localStorage.setItem(NIHDYDTL, JSON.stringify(res?.data))
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getLoginDeatils = createAsyncThunk(
  "auth/getLoginDeatils",
  async (token, thunkAPI) => {
    try {
      console.log("token", token)
      const res = await getLoginDeatilsAPI(token)
      localStorage.setItem(NIHDYDTL, JSON.stringify(res))
      localStorage.setItem(ACCESSTOKEN, res.token)
      // navigate('/saved-card')
      return res
    } catch (error) {
      const message = error?.response?.data?.message || error.toString();
      thunkAPI.dispatch(notificationHandler({ status: 'error', message: typeof message === 'string' ? { en: message } : message }))
      return thunkAPI.rejectWithValue(message);
    }
  }
);
