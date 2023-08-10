import { getRequest } from "../utils/request";
const URL = 'API'

export const getRawTransactionAPI = ({ current, pageSize }) => getRequest(`/${URL}/frontend-dashboard/user-get-raw-transaction/${current}/${pageSize}`)




