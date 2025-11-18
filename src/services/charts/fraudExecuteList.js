import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const fraudExecuteList = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/FraudExecute/list`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default fraudExecuteList;