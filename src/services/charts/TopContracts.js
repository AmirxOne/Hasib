import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const TopContracts = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/TopContracts/TopContracts`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default TopContracts;