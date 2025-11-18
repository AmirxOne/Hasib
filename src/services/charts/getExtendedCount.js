import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const getExtendedCount = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/ContractsStatistics/GetExtendedCount`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default getExtendedCount;