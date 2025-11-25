import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: false ?'http://172.16.0.9:5001/' : 'http://localhost:5001/',
    withCredentials: true,
});

// // Attach CSRF token to every request automatically
// api.interceptors.request.use((config) => {
//     const csrfToken = getCookie('csrftoken');
//     if (csrfToken) {
//         config.headers['X-CSRFToken'] = csrfToken;
//     }
//     config.headers['Content-Type'] = 'application/json';
//     return config;
// });

// // Helper: extract a cookie value by name
// function getCookie(name: string): string {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
//     return '';
// }

export default api;