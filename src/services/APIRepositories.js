import axios from 'axios';
// import Cookies from 'js-cookie'

export const createApiInstance = (uri) => axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${uri}`,
    timeout: 600000,
    headers: {
        "Accept": "application/json",
    },
});