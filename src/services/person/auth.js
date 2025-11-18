import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const auth = async (data) => {
    const option = {
        axios: person,
        method: 'POST',
        endpoint: '/Account/login',
        data: data
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default auth;