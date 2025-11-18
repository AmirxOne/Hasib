import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const contractInfo = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/ContractDetails/ContractInfo`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default contractInfo;