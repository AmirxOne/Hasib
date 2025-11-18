import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const advanceSearch = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/AdvanceSearch/Get`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default advanceSearch;