import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const getSettings = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/Settings/get`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default getSettings;