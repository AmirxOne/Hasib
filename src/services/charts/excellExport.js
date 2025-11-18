import { dynamicRequest } from "../dynamicRequest";
import { dashboard } from '../APIFactory'

const excellExport = async (parameters) => {
    const option = {
        axios: dashboard,
        method: 'GET',
        endpoint: "/ExcellExport/ExcellReport",
        params: parameters,
        responseType: "arraybuffer",
        Headers: {
            'Content-Type': 'application/octet-stream',
        }
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default excellExport;