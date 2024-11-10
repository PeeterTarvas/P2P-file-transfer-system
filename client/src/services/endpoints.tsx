const BASE_URL = "http://localhost:8080/"

const ENDPOINTS = {
    LOGIN: 'user/login',
    REGISTER: 'user/register',
    AVAILABILITY: (filename: string) => `files/availability/${filename}`,
    USERS: 'user/allusers',
    GROUPS: 'group',
    GROUP_DETAILS: (groupId: number) => `group/${groupId}`,
}

export default {BASE_URL, ENDPOINTS}