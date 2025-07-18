const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if it exists
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.success && response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  // Login user
  login: async (credentials) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.success && response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  // Verify token
  verify: async () => {
    return await apiCall('/auth/verify');
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

// User API calls
export const userAPI = {
  // Get user profile
  getProfile: async (userId) => {
    return await apiCall(`/users/profile/${userId}`);
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return await apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Get all users
  getUsers: async () => {
    return await apiCall('/users');
  }
};

export default { authAPI, userAPI };
