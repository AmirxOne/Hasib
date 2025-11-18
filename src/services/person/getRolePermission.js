import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const getRolePermission = async (parameters) => {
    const option = {
        axios: person,
        method: 'GET',
        endpoint: `/Roles/getrolepermission`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default getRolePermission;