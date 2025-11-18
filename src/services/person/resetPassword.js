import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIFactory'

const resetPassword = async (data) => {
    const option = {
        axios: person,
        method: 'POST',
        endpoint: `/Manage/resetpassword`,
        data: data
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};


export default resetPassword;