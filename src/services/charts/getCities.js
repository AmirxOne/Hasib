import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const getCities = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/GeoDivision/GeoDivision_Cities`,
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