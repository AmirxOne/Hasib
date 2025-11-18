import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const propertyInfo = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/ContractDetails/PropertyInfo`,
        params: parameters
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default propertyInfo;