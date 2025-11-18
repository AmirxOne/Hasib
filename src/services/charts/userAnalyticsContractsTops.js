import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const userAnalyticsContractsTops = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/ContractsStatistics/UserAnalyticsContractsTops`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default userAnalyticsContractsTops;