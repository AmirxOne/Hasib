import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const partiesToTheContract = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/ContractDetails/PartiesToTheContract`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default partiesToTheContract;