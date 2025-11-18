import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const fraudRulesDelete = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'DELETE',
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


export default fraudRulesDelete;