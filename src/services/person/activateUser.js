import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const activateUser = async (data) => {
    const option = {
        axios: person,
        method: 'POST',
        endpoint: '/Users/activateuser',
        data: data
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default activateUser;