import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const deleteUser = async (parameters) => {
    const option = {
        axios: person,
        method: 'DELETE',
        endpoint: `/Users/deleteuser`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default deleteUser;