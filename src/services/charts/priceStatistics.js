import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const priceStatistics = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint:`/PriceStatistics/ProvincePriceStatistics` ,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default priceStatistics;