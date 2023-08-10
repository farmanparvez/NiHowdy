import axios from 'axios';
const instance = axios.create({ baseURL: 'https://dev.backend.nihowdy.com' });
export default instance