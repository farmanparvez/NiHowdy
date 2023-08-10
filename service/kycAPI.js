import { getRequest, postRequest } from "../utils/request";
const URL = 'API'

export const getSdKTokenAPI = () => getRequest(`/${URL}/kyc/sdk-token`)

export const createCheckAPI = (data) => postRequest(`/${URL}/kyc/create-check`, data)

export const getKycStatusAPI = () => getRequest(`/${URL}/kyc/get-kyc`)



