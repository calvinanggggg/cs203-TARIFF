// Authentication utility functions

// Store token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem('token');
};

// Store user data in localStorage
export const setUser = (user: any): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Get user data from localStorage
export const getUser = (): any => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Remove user data from localStorage
export const removeUser = (): void => {
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Logout user
export const logout = (): void => {
  removeToken();
  removeUser();
};