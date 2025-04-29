import { toast } from "sonner";

// Base API URL - replace with your actual backend URL when ready
const API_BASE_URL = "https://api.supamenu.com/v1"; // Replace this with your actual API URL when available

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method: RequestMethod;
  headers: Record<string, string>;
  body?: string;
}

/**
 * Creates a full URL for API requests
 */
const createUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
};

/**
 * Core API request function
 */
const apiRequest = async <T>(
  endpoint: string,
  method: RequestMethod = "GET",
  data?: unknown,
  customHeaders: Record<string, string> = {}
): Promise<T> => {
  // Get auth token from localStorage
  const token = localStorage.getItem("supamenu_token");
  
  const options: RequestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...customHeaders,
    },
  };

  if (data && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(data);
  }

  try {
    const url = createUrl(endpoint);
    const response = await fetch(url, options);
    
    // Parse response body
    const responseData = await response.json();
    
    // Handle error responses
    if (!response.ok) {
      const errorMessage = responseData.message || `Error: ${response.status}`;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    return responseData as T;
  } catch (error) {
    console.error(`API ${method} request failed:`, error);
    throw error;
  }
};

// API method functions
export const apiService = {
  /**
   * GET request
   */
  get: <T>(endpoint: string, customHeaders?: Record<string, string>): Promise<T> => {
    return apiRequest<T>(endpoint, "GET", undefined, customHeaders);
  },
  
  /**
   * POST request
   */
  post: <T>(endpoint: string, data?: unknown, customHeaders?: Record<string, string>): Promise<T> => {
    return apiRequest<T>(endpoint, "POST", data, customHeaders);
  },
  
  /**
   * PUT request
   */
  put: <T>(endpoint: string, data?: unknown, customHeaders?: Record<string, string>): Promise<T> => {
    return apiRequest<T>(endpoint, "PUT", data, customHeaders);
  },
  
  /**
   * DELETE request
   */
  delete: <T>(endpoint: string, data?: unknown, customHeaders?: Record<string, string>): Promise<T> => {
    return apiRequest<T>(endpoint, "DELETE", data, customHeaders);
  },
};

// API endpoints - add your endpoints here
export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    profile: "/auth/profile",
  },
  restaurants: {
    list: "/restaurants",
    detail: (id: string) => `/restaurants/${id}`,
    create: "/restaurants",
    update: (id: string) => `/restaurants/${id}`,
    delete: (id: string) => `/restaurants/${id}`,
  },
  menus: {
    list: "/menus",
    detail: (id: string) => `/menus/${id}`,
    create: "/menus",
    update: (id: string) => `/menus/${id}`,
    delete: (id: string) => `/menus/${id}`,
    items: (menuId: string) => `/menus/${menuId}/items`,
  },
  orders: {
    list: "/orders",
    detail: (id: string) => `/orders/${id}`,
    create: "/orders",
    update: (id: string) => `/orders/${id}`,
    delete: (id: string) => `/orders/${id}`,
  },
};

// Type definitions for API responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: "success" | "error";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}