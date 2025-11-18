import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const getLogEventGroupList = async () => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: `/LogEvent/grouplist`
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default getLogEventGroupList;