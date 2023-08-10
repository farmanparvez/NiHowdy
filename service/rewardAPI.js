import { getRequest, postRequest } from "../utils/request"
const URL = 'API'

export const getUserBitcoinTotalRewardAmountAPI = () => getRequest(`/${URL}/frontend-dashboard/user-bitcoin-reward-total-amount`)

export const getWithDrawHistoryAPI = ({ current, pageSize }) => getRequest(`/${URL}/reward/reward-history/${current}/${pageSize}`)

export const withDrawBitcoinAPI = (data) => postRequest(`/${URL}/reward/withdraw-reward`, data)


