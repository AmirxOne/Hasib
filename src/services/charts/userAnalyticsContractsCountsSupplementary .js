import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const userAnalyticsContractsCountsSupplementary  = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/ContractsStatistics/userAnalyticsContractsCountsSupplementary `,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default userAnalyticsContractsCountsSupplementary ;