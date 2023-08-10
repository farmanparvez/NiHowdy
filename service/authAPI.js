import { postRequest, getRequest } from "../utils/request";
const URL = 'api'

export const signUpAPI = (data) => postRequest(`/${URL}/user/signup`, data)

export const signInAPI = (data) => postRequest(`/${URL}/user/login`, data)

export const logoutAPI = () => getRequest(`/${URL}/user/logout`)

export const getCurrentUserAPI = () => getRequest(`/${URL}/user/current_user`)

export const resendEmailAPI = (data) => postRequest(`/${URL}/user/resend-verification-link`, data)

export const profileAPI = (data) => postRequest(`/${URL}/user/profile-update`, data)

export const forgetPasswordAPI = (data) => postRequest(`/${URL}/user/forgot-password`, data)

export const verifyOtpForgotPasswordAPI = (data) => postRequest(`/${URL}/user/verify-otp`, data)

export const resetPasswordAPI = (data) => postRequest(`/${URL}/user/reset-password`, data)

export const getLoginDeatilsAPI = (token) => getRequest(`/${URL}/user/get-access-token/${token}`)


