import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const TopPostalCode = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/TopContracts/TopPostalCode`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default TopPostalCode;