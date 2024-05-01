const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL; 

const BASE_URL = BACKEND_BASE_URL || 'https://mern-blog-backend-fsqy.onrender.com';

export { BASE_URL };