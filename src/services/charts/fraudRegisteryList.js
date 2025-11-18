import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const fraudRegisteryList = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/FraudRegistery/list`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default fraudRegisteryList;