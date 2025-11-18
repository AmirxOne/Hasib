import { dynamicRequest } from "../dynamicRequest";
import { geo } from '../APIFactory'

const getCities = async (parameters) => {
    const option = {
        axios: geo,
        method: 'GET',
        endpoint: `/GeoDivision/GetCities`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default getCities;