import ENDPOINTS from './endpoints.tsx'
import ApiMethods from "./api-methods.tsx";
import {LoginRequestInterface, UserInterface} from '../interfaces/user.interface.tsx';
import {FileDto} from "../interfaces/file.interface.tsx";



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

    static searchUsersByTerm = (searchTerm: string) => {
        const url = ENDPOINTS.ENDPOINTS.SEARCH_USER(searchTerm);
        const headers = { 'Authorization': `Bearer ${getToken()}` };
        return ApiMethods.get(url, headers);
    };

    static createFileAvailabilityIndexByPeerId = (peerId: string, file_metadata: FileDto) => {
        const url = ENDPOINTS.ENDPOINTS.SAVE_FILE_AVAILABILITY_BY_PEERID(peerId);
        const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}`}
        return ApiMethods.post(url, file_metadata, headers);
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

    static fetchUserGroups = (username: string) => {
        const url = ENDPOINTS.ENDPOINTS.USERS_GROUPS(username);
        const headers = { 'Authorization': `Bearer ${getToken()}` };
        return ApiMethods.get(url, headers);
    }

    static deleteGroup = (groupId: number) => {
        const url = ENDPOINTS.ENDPOINTS.GROUP_DETAILS(groupId);
        const headers = { 'Authorization': `Bearer ${getToken()}` };
        return ApiMethods.delete(url, headers);
    }

    static removeUserFromGroup = (groupId: number, username: string) => {
        const url = ENDPOINTS.ENDPOINTS.REMOVE_USER_FROM_GROUP(groupId, username);
        const headers = { 'Authorization': `Bearer ${getToken()}` };
        return ApiMethods.delete(url, headers);
    }

    static addUserToGroup = (groupId: number, username: string) => {
        const url = ENDPOINTS.ENDPOINTS.ADD_USER_TO_GROUP(groupId, username);
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` };
        return ApiMethods.post(url, undefined, headers);
    };
}

export default ApiManager;