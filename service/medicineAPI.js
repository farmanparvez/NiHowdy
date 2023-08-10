import { postRequest1, getRequest, postRequest } from "../utils/request";

export const popularDrugAPI = () => postRequest1(`/proxy/pricing/v3/populardrug`);

export const searchDrugAPI = (data) => postRequest1(`/proxy/pricing/v3/searchdrug`, data);

export const allDrugAPI = (data) => postRequest1(`/proxy/pricing/v3/alldrugs`, data);

export const drugDetailAPI = (data) => postRequest1(`/proxy/pricing/v3/drugcomponents`, data);

export const drugDescriptionAPI = (data) => postRequest(`/api/drug/drug-info`, data)

export const drugSearchNDCAPI = (data) => postRequest1(`/proxy/pricing/v3/searchndc`, data);

export const drugImageByNdCodeAPI = (ndcode) => getRequest(`/api/drug/drug-image/${ndcode}`);

export const getMedicinePricesByGeoCodeAPI = (data) => postRequest1(`/proxy/pricing/v3/searchndcgeo`, data);

export const getMedicinePricesByCodeAPI = (data) => postRequest1(`/proxy/pricing/v3/searchndc`, data);

