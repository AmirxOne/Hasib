import { dynamicRequest } from "../dynamicRequest";
import { geo } from '../APIFactory'

const getProvince = async (parameters) => {
    const option = {
        axios: geo,
        method: 'OPTIONS',
        endpoint: `/GeoDivision/GetStates`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default getProvince;