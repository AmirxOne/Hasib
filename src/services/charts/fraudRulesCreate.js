import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const fraudRulesCreate = async (data) => {
    const option = {
        axios: dashboard,
        method: 'POST',
        endpoint: `/FraudRules`,
        data: data
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default fraudRulesCreate;