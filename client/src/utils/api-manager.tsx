import ENDPOINTS from './endpoinst.tsx'
import ApiMethods from "./api-methods.tsx";
import {UserInterface} from '../interfaces/user.interface.tsx';

class ApiManager {
    static register = (userDto: UserInterface) => {
        const url = ENDPOINTS.ENDPOINTS.REGISTER;
        return ApiMethods.post(url, userDto)
    }

}

export default {ApiManager};