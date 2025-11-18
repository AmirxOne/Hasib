import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const getUsersInfo = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/ContractsInquiry/GetUsersInfo`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default getUsersInfo;