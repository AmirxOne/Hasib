import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const fraudRulesList = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/FraudRules/list`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default fraudRulesList;