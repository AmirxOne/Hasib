import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const badges = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/ContractsStatistics/Badges`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default badges;