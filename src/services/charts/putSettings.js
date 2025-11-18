import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const putSetting = async (data) => {
    const option = {
        axios: dashboard,
        method: 'PUT',
        endpoint: `/Settings`,
        params: { id: data.id },
        data: data
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default putSetting;