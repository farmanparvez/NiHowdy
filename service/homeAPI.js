import { getRequest, postRequest } from "../utils/request";
const URL = 'api'

export const getCurrencyPriceAPI = ({ amount, from_currency_id, to_currency_symbol }) => getRequest(`/${URL}/price/price-conversion/${amount}/${from_currency_id}/${to_currency_symbol}`)

export const getBicoinPriceAPI = (id) => getRequest(`/${URL}/price/btc-price/${id}`)

export const getCardDetaiailsAPI = () => getRequest(`/${URL}/card/card-info`)

export const getPopularDrugAPI = () => getRequest(`/${URL}/frontend-dashboard/popular-drug-info-front`,)

// export const getBlogAPI = () => getRequest("", `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nihowdy`, {})

export const getRewardValueInYearAPI = () => getRequest(`/${URL}/frontend-dashboard/rewards-appreciate-value`)

export const rewardPercentBasedOnPriceAPI = () => getRequest(`/${URL}/reward/reward-percentage-front`)

export const emailDefautSavingCardAPI = (data) => postRequest(`/${URL}/card/default-card-email`, data)

export const newsletterEmailAPI = (data) => postRequest(`/${URL}/frontend-dashboard/newsletter-email`, data)


