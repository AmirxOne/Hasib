import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const deleteRole = async (parameters) => {
    const option = {
        axios: person,
        method: 'DELETE',
        endpoint: `/Roles/deleterole`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default deleteRole;