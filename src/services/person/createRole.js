import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const createRole = async (data) => {
    const option = {
        axios: person,
        method: 'POST',
        endpoint: `/Roles/create`,
        data: data
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default createRole;