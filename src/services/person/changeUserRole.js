import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const changeUserRole = async (data, parameters) => {
    const option = {
        axios: person,
        method: 'PUT',
        endpoint: `/Users/changeuserrole`,
        data: data,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default changeUserRole;