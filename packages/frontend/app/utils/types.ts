export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  redirectUrl?: string;
}

export interface LoginData {
  email: string;
  password: string;
  redirectUrl?: string;
}

export interface InviteData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  role: string;
}

export interface ProjectData {
  name: string
  description: string
}

export interface TaskData {
  title: string
  description?: string
  userId: string
  projectId: string
}