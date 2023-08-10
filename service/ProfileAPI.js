
import { getRequest } from "../utils/request";
const URL = 'API'

export const getProfileAPI = (data) => getRequest(`/${URL}/user/get-profile`, data)



