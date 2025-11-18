import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const getRole = async (parameters) => {
    const option = {
        axios: person,
        method: 'GET',
        endpoint: `/Roles/getrole`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default getRole;