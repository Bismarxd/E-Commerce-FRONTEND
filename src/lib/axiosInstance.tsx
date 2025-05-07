import axios from 'axios';
import Cookies from 'js-cookie'

// Crea la instancia con configuración personalizada
export const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.21:4000/api', // Cambia por la URL base de tu API
  timeout: 10000, // Tiempo de espera en ms
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar el token automáticamente a cada solicitud
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token"); // Obtener el token desde las cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agregar token al header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
