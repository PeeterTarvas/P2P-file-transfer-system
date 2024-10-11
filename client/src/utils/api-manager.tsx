import ENDPOINTS from './endpoinst.tsx'
import ApiMethods from "./api-methods.tsx";
import {LoginRequestInterface, UserInterface} from '../interfaces/user.interface.tsx';

class ApiManager {

    static testGet = () => {
        return ApiMethods.get('/user');
    }

    static register = (userDto: UserInterface) => {
        const url = ENDPOINTS.ENDPOINTS.REGISTER;
        return ApiMethods.post(url, userDto)
    }

    static login = (loginRequest: LoginRequestInterface) => {
        const url = ENDPOINTS.ENDPOINTS.LOGIN;
        return ApiMethods.post(url, loginRequest)

    }

}

export default ApiManager;