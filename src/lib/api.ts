// API configuration and utility functions for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// User interface
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
}

// API response types
interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

interface AuthResponse {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isActive: boolean;
  };
  token: string;
  refreshToken?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = getStoredToken();
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// Token management
export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export function setStoredToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

export function removeStoredToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('user_data');
  if (!userData) return null;
  
  try {
    const parsed = JSON.parse(userData);
    // Basic validation to ensure it has User properties
    if (parsed && typeof parsed === 'object' && parsed._id && parsed.email) {
      return parsed as User;
    }
    return null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user_data', JSON.stringify(user));
}

// Auth API functions
export const authApi = {
  // Login
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.data) {
      // Store token and user data
      setStoredToken(response.data.token);
      setStoredUser(response.data.user);
    }

    return response.data!;
  },

  // Register
  async register(data: SignupData): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.data) {
      // Store token and user data
      setStoredToken(response.data.token);
      setStoredUser(response.data.user);
    }

    return response.data!;
  },

  // Get current user profile
  async getProfile(): Promise<any> {
    const response = await apiRequest('/auth/profile');
    return response.data;
  },

  // Logout
  logout(): void {
    removeStoredToken();
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!getStoredToken();
  }
};

// Articles API
export const articlesApi = {
  async getAll(params?: any) {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiRequest(`/articles${queryString}`);
  },

  async getById(id: string) {
    return apiRequest(`/articles/${id}`);
  },

  async create(data: any) {
    return apiRequest('/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: any) {
    return apiRequest(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiRequest(`/articles/${id}`, {
      method: 'DELETE',
    });
  },

  async publish(id: string) {
    return apiRequest(`/articles/${id}/publish`, {
      method: 'PATCH',
    });
  },

  async archive(id: string) {
    return apiRequest(`/articles/${id}/archive`, {
      method: 'PATCH',
    });
  }
};

// Careers API
export const careersApi = {
  async getAll(params?: any) {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiRequest(`/careers${queryString}`);
  },

  async getById(id: string) {
    return apiRequest(`/careers/${id}`);
  },

  async create(data: any) {
    return apiRequest('/careers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: any) {
    return apiRequest(`/careers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiRequest(`/careers/${id}`, {
      method: 'DELETE',
    });
  },

  async getApplications(id: string) {
    return apiRequest(`/careers/${id}/applications`);
  }
};

// CRM API
export const crmApi = {
  async getAll(params?: any) {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiRequest(`/crm${queryString}`);
  },

  async getById(id: string) {
    return apiRequest(`/crm/${id}`);
  },

  async create(data: any) {
    return apiRequest('/crm', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: any) {
    return apiRequest(`/crm/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiRequest(`/crm/${id}`, {
      method: 'DELETE',
    });
  },

  async getActivities(id: string) {
    return apiRequest(`/crm/${id}/activities`);
  }
};

// Newsletter API
export const newsletterApi = {
  async getAll(params?: any) {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiRequest(`/newsletters${queryString}`);
  },

  async getById(id: string) {
    return apiRequest(`/newsletters/${id}`);
  },

  async create(data: any) {
    return apiRequest('/newsletters', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: any) {
    return apiRequest(`/newsletters/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiRequest(`/newsletters/${id}`, {
      method: 'DELETE',
    });
  },

  async send(id: string) {
    return apiRequest(`/newsletters/${id}/send`, {
      method: 'POST',
    });
  },

  // Subscribers
  async getSubscribers(params?: any) {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiRequest(`/subscribers${queryString}`);
  },

  async deleteSubscriber(id: string) {
    return apiRequest(`/subscribers/${id}`, {
      method: 'DELETE',
    });
  }
};

export default {
  authApi,
  articlesApi,
  careersApi,
  crmApi,
  newsletterApi
};