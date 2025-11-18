import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const amlakSearch = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/AmlakSearch/Get`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default amlakSearch;