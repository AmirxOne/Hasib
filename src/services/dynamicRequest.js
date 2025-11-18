//functions
import Cookies from 'js-cookie';
import toastHandler from '@/functions/toastHandler';
import { redirect } from 'next/navigation';

export const dynamicRequest = async ({ method, endpoint, data, headers, axios, params, responseType }) => {
    try {
        const config = {
            url: endpoint,
            method: method,
            headers: headers,
            params: params,
            data: data,
            responseType: responseType
            //...(method === "GET" ? { params: data } : { data: data })
        };

        const token = Cookies.get('TOKEN');
        if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const res = await axios(config);
        if (res.data.message) toastHandler('success', res.data.message);

        return res;
    } catch (error) {
        handleRequestError(error);
    }
};

const handleRequestError = (error) => {
    const { response } = error;
    if (!response) {
        throw error;
    }

    switch (response.status) {
        case 500:
            toastHandler('error', 'خطایی در ارتباط با سرور.');
            break;
        case 422:
            toastHandler('error', 'اطلاعات ارسالی صحیح نیست.');
            break;
        case 401:
            Cookies.remove('TOKEN');
            redirect("/login");
        case 403:
            toastHandler('error', 'شما دسترسی لازم را ندارید');
        case 400:
            if (response.data.errors) toastHandler('error', response.data.errors);
            break;
        default:
            break;
    }

    throw error;
};
