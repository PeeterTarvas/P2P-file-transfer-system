import axios from "axios";

const API_URL = "http://localhost:8080"; // Update this to match your backend URL

export const fetchUsers = () => axios.get(`${API_URL}/user/allusers`);

export const fetchGroups = () => axios.get(`${API_URL}/group`);

export const createGroup = (groupData: {
  name: string;
  owner: string;
  members: string[];
}) => axios.post(`${API_URL}/group`, groupData);

export const fetchGroupDetails = (groupId: number) =>
  axios.get(`${API_URL}/group/${groupId}`);
