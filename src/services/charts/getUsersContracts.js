import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const getUsersContracts = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/ContractsInquiry/GetUsersContracts`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default getUsersContracts;