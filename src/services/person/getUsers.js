import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const getUsers = async (parameters) => {
    const option = {
        axios: person,
        method: 'GET',
        endpoint: `/Users/getusers`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default getUsers;