const BASE_URL = "http://localhost:8080/"

const ENDPOINTS = {
    LOGIN: 'user/login',
    REGISTER: 'user/register',
    AVAILABILITY: (filename: string) => `files/availability/${filename}`,
    USERS: 'user/allusers',
    GROUPS: 'group',
    GROUP_DETAILS: (groupId: number) => `group/${groupId}`,
    USERS_GROUPS: (username: string) => `group/user/${username}`
}

export default {BASE_URL, ENDPOINTS}