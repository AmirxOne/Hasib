import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const fraudRules = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/FraudRules`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default fraudRules;