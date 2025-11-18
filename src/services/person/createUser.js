import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const createUser = async (data) => {
    const option = {
        axios: person,
        method: 'POST',
        endpoint: `/Users/createuser`,
        data: data
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default createUser;