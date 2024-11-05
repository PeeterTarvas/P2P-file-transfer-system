import ENDPOINTS from './endpoints.tsx'
import ApiMethods from "./api-methods.tsx";
import {LoginRequestInterface, UserInterface} from '../interfaces/user.interface.tsx';

class ApiManager {

    static testGet = () => {
        return ApiMethods.get('/user');
    }

    static register = (userDto: UserInterface) => {
        const url = ENDPOINTS.ENDPOINTS.REGISTER;
        const headers = {'Content-Type': 'application/json'}
        return ApiMethods.post(url, userDto, headers)
    }

    static login = (loginRequest: LoginRequestInterface) => {
        const url = ENDPOINTS.ENDPOINTS.LOGIN;
        const headers = {'Content-Type': 'application/json'}
        return ApiMethods.post(url, loginRequest, headers)
    }
}

export default ApiManager;