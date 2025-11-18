import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const ProvinceCenterBadges = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/UsersCount`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default ProvinceCenterBadges;