const BASE_URL = "http://localhost:8080/"

const ENDPOINTS = {
    LOGIN: 'user/login',
    REGISTER: 'user/register',
    AVAILABILITY: (filename: string) => `files/availability/${filename}`,
    SAVE_FILE_AVAILABILITY_BY_PEERID: (peerId: string) => `files/user/${peerId}`,
    USERS: 'user/allusers',
    GROUPS: 'group',
    SEARCH_USER: (searchTerm: string) => `user/search/${searchTerm}`,
    GROUP_DETAILS: (groupId: number) => `group/${groupId}`,
    USERS_GROUPS: (username: string) => `group/user/${username}`,
    REMOVE_USER_FROM_GROUP: (groupId: number, username: string) => `group/${groupId}/user/${username}`,
    ADD_USER_TO_GROUP: (groupId: number, username: string) => `group/${groupId}/user/${username}`
}

export default {BASE_URL, ENDPOINTS}