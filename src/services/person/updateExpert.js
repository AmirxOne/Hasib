import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const updateExpert = async (data, parameters) => {
    const option = {
        axios: person,
        method: 'PUT',
        endpoint: `/Users/update`,
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


export default updateExpert;