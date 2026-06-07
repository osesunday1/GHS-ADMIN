import axiosLib from 'axios';
import { LOGOUT } from '../store/types/types';

const instance = axiosLib.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const setupInterceptors = (store) => {
  const onFulfilled = (response) => response;

  const onRejected = (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('authUser');
      localStorage.removeItem('authToken');
      store.dispatch({ type: LOGOUT });

      // Only redirect if not already on the login page
      if (!window.location.pathname.includes('/login')) {
        window.location.replace('/login?expired=1');
      }
    }
    return Promise.reject(error);
  };

  // Cover all direct `import axios from 'axios'` calls
  axiosLib.interceptors.response.use(onFulfilled, onRejected);

  // Cover calls using the custom instance
  instance.interceptors.response.use(onFulfilled, onRejected);
};

export default instance;
