import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const updateRoleTitle = async (data, parameters) => {
    const option = {
        axios: person,
        method: 'PUT',
        endpoint: `/Roles/update`,
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


export default updateRoleTitle;