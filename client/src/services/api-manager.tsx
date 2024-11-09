import ENDPOINTS from './endpoints.tsx'
import ApiMethods from "./api-methods.tsx";
import {LoginRequestInterface, UserInterface} from '../interfaces/user.interface.tsx';



const getToken = () => {
    return sessionStorage?.getItem('token') || undefined;
}



class ApiManager {

    static register = (userDto: UserInterface) => {
        const url = ENDPOINTS.ENDPOINTS.REGISTER;
        const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}`}
        return ApiMethods.post(url, userDto, headers)
    }

    static login = (loginRequest: LoginRequestInterface) => {
        const url = ENDPOINTS.ENDPOINTS.LOGIN;
        const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}`}
        return ApiMethods.post(url, loginRequest, headers)
    }

    static getFileAvailability = (filename: string) => {
        const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}`}

        const url = ENDPOINTS.ENDPOINTS.AVAILABILITY(filename);
        return ApiMethods.get(url, headers);
    }

    static fetchUsers = () => {
        const url = ENDPOINTS.ENDPOINTS.USERS;
        const headers = { 'Authorization': `Bearer ${getToken()}` };
        return ApiMethods.get(url, headers);
    };

    static fetchGroups = () => {
        const url = ENDPOINTS.ENDPOINTS.GROUPS;
        const headers = { 'Authorization': `Bearer ${getToken()}` };
        return ApiMethods.get(url, headers);
    };

    static createGroup = (groupData: { name: string; owner: string; members: string[] }) => {
        const url = ENDPOINTS.ENDPOINTS.GROUPS;
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` };
        return ApiMethods.post(url, groupData, headers);
    };

    static fetchGroupDetails = (groupId: number) => {
        const url = ENDPOINTS.ENDPOINTS.GROUP_DETAILS(groupId);
        const headers = { 'Authorization': `Bearer ${getToken()}` };
        return ApiMethods.get(url, headers);
    };
}

export default ApiManager;