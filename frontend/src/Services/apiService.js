import axios from 'axios';

const apiService = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',

  // Initialize Axios with default headers
  axiosInstance: axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
  }),

  // Set JWT token for requests
  setAuthToken(token) {
    if (token) {
      apiService.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiService.axiosInstance.defaults.headers.common['Authorization'];
    }
  },

  // Handle errors
  handleError(error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(error.message || 'Request setup error');
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await apiService.axiosInstance.post('/auth/login', credentials);
      apiService.setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      apiService.handleError(error);
    }
  },

  // Get user profile
  getUserProfile: async () => {
    try {
      const token = localStorage.getItem('token');
      apiService.setAuthToken(token);
      const response = await apiService.axiosInstance.get('/auth/profile'); // Assume backend supports this
      return response.data;
    } catch (error) {
      apiService.handleError(error);
    }
  },

  // GET: Fetch dashboard data
  getDashboardData: async () => {
    try {
      const response = await apiService.axiosInstance.get('/dashboard');
      return response.data;
    } catch (error) {
      apiService.handleError(error);
    }
  },

  // GET: Fetch menu items
  getMenus: async () => {
    try {
      const response = await apiService.axiosInstance.get('/menus');
      return response.data;
    } catch (error) {
      apiService.handleError(error);
    }
  },

  // POST: Create a new menu item
  createMenu: async (menuData) => {
    try {
      const response = await apiService.axiosInstance.post('/menus', menuData);
      return response.data;
    } catch (error) {
      apiService.handleError(error);
    }
  },

  // PUT: Update a menu item
  updateMenu: async (id, menuData) => {
    try {
      const response = await apiService.axiosInstance.put(`/menus/${id}`, menuData);
      return response.data;
    } catch (error) {
      apiService.handleError(error);
    }
  },

  // DELETE: Delete a menu item
  deleteMenu: async (id) => {
    try {
      const response = await apiService.axiosInstance.delete(`/menus/${id}`);
      return response.data;
    } catch (error) {
      apiService.handleError(error);
    }
  },

  // GET: Fetch orders
  getOrders: async () => {
    try {
      const response = await apiService.axiosInstance.get('/orders');
      return response.data;
    } catch (error) {
      apiService.handleError(error);
    }
  },
};

// Initialize with stored token
const token = localStorage.getItem('token');
if (token) {
  apiService.setAuthToken(token);
}

export default apiService;