import { useAppSession } from '../app/utils/session';
import { RegisterData, LoginData, InviteData, ProjectData, TaskData } from '../app/utils/types';
import axios from 'axios';

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor to add auth token to requests
api.interceptors.request.use(async (config) => {
  const session = await useAppSession()
  const token = session.data?.user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async register(data: RegisterData) {
    const response = await api.post('/register', data);
    return response.data;
  },

  async login(data: LoginData) {
    const response = await api.post('/login', data);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/users');
    return response.data;
  },
};

export const orgService = {
  async create(data: { name: string, description?: string, domain: string }) {
    const response = await api.post('/organizations', data)
    return response.data
  },

  async getOrg(id: number) {
    const response = await api.get(`/organizations/${id}`)
    return response.data
  },

  async getOrgs() {
    const response = await api.get(`/organizations`)
    return response.data
  },

  async getOrgMembers() {
    const session = await useAppSession()
    const response = await api.get(`/organizations/${session.data.user.orgs[0].organizationId}/members`)
    return response.data
  },

  async inviteMember(data: InviteData) {
    const session = await useAppSession()
    const response = await api.post(`/organizations/${session.data.user.orgs[0].organizationId}/members`, data)
    return response.data
  },

  async getProjects() {
    const session = await useAppSession()
    const response = await api.get(`/organizations/${session.data.user.orgs[0].organizationId}/projects`)
    return response.data
  },

  async createProject(data: ProjectData) {
    const session = await useAppSession()
    const response = await api.post(`/organizations/${session.data.user.orgs[0].organizationId}/projects`, data)
    return response.data
  },

  async getUserTasks() {
    const session = await useAppSession()
    const response = await api.get('/tasks')
    return response.data
  },

  async createTask(data: TaskData) {
    const response = await api.post('/tasks', data)
    return response.data
  },
}