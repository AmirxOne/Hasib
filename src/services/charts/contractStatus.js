import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const contractStatus = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/ContractDetails/ContractStatus`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default contractStatus;