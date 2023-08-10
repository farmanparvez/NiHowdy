
import { postRequest } from "../utils/request";
const URL = 'API'

export const qrSignInAPI = (data) => postRequest(`/${URL}/user/scan-qr`, data)



