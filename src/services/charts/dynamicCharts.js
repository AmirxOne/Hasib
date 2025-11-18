import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const dynamicCharts = async ({ parameters, endpoint }) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: endpoint,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default dynamicCharts;