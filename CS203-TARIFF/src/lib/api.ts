import { getToken } from './auth';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * API client that automatically includes JWT token in requests
 */
export const api = {
  /**
   * Make a GET request to the API
   * @param endpoint - API endpoint (without the base URL)
   * @param options - Additional fetch options
   * @returns Promise with the response data
   */
  async get<T>(endpoint: string, options = {}): Promise<T> {
    const token = getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
      ...options,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'API request failed');
    }
    
    return response.json();
  },
  
  /**
   * Make a POST request to the API
   * @param endpoint - API endpoint (without the base URL)
   * @param data - Request body data
   * @param options - Additional fetch options
   * @returns Promise with the response data
   */
  async post<T>(endpoint: string, data: any, options = {}): Promise<T> {
    const token = getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      ...options,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'API request failed');
    }
    
    return response.json();
  },
  
  /**
   * Make a PUT request to the API
   * @param endpoint - API endpoint (without the base URL)
   * @param data - Request body data
   * @param options - Additional fetch options
   * @returns Promise with the response data
   */
  async put<T>(endpoint: string, data: any, options = {}): Promise<T> {
    const token = getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
      ...options,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'API request failed');
    }
    
    return response.json();
  },
  
  /**
   * Make a DELETE request to the API
   * @param endpoint - API endpoint (without the base URL)
   * @param options - Additional fetch options
   * @returns Promise with the response data
   */
  async delete<T>(endpoint: string, options = {}): Promise<T> {
    const token = getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
      ...options,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'API request failed');
    }
    
    return response.json();
  }
};