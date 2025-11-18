import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const getPropertyInfo = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/ContractsInquiry/GetPropertyInfo`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default getPropertyInfo;