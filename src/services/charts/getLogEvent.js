import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const getLogEvent = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/LogEvent`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default getLogEvent;