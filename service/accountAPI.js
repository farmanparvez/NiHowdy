// import axios from "axios";
import { getRequest } from "../utils/request";
const URL = 'api'

export const getStateAPI = () => getRequest(`/${URL}/states/all-states`)


