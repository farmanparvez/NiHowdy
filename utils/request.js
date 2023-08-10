import axios from "axios";
import { BACKEND_API_URL, glicAuthorization, BACKEND_GLIC_API_URL } from "./enviroment";

const credentials = { withCredentials: true };

export const postRequest = (url, data, BACKEND_URL, headers) => {
  const URL = BACKEND_URL ? BACKEND_URL : `${BACKEND_API_URL}${url}`
  const config = headers ? headers : credentials
  return axios.post(URL, data, config)
    .then((res) => res.data);
}

export const getRequest = (url, backend_url, headers) => {
  const URL = backend_url ? backend_url : `${BACKEND_API_URL}${url}`
  const config = headers ? headers : credentials
  // console.log(config)
  return axios.get(URL, config).then((res) => res.data);
}

var config = {
  headers: {
    Authorization: `Basic ${glicAuthorization}`,
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
};

export const postRequest1 = (url, data) => {
  return axios
    .post(`${BACKEND_GLIC_API_URL}${url}`, data, config)
    .then((res) => res.data);
};

export const getRequest1 = (url, BACKEND_URL) => {
  return axios.get(`${BACKEND_GLIC_API_URL}${url}`, config).then((res) => res.data);
};

export const requests = (config) => {
  const configs = {
    method: config?.method ? config?.method : 'GET',
    url: config?.fullUrl ? config?.fullUrl : `${BACKEND_API_URL}/${config?.url}`,
    headers: config?.headers ? config?.headers : credentials,
    body: config?.body ? config?.body : null
  }
  return axios.request(configs).then((res) => res.data)
}