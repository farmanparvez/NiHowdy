
import { getRequest, postRequest } from "../utils/request";
const URL = 'API'

export const getProfileSavingCardAPI = () => getRequest(`/${URL}/card/saving-card`, )

export const emailSavingCardAPI = (data) => postRequest(`/${URL}/card/send-card-email`, data)


