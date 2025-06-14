import axios from 'axios';

// Determine the API base URL based on environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // Use relative path in production
  : '/api'; // Use proxy path in development (Vite will proxy to localhost:5000)

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,  // Set to false when using proxy
  timeout: 10000,  // 10 second timeout
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Response received:`, response.status, response.statusText);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error - API server may be down');
      error.message = 'Network error. Please check if the server is running.';
    } else {
      // Handle HTTP errors
      console.error(`HTTP Error ${error.response.status}:`, error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export const contactAPI = {
  // Health check
  healthCheck: () => api.get('/health'),
  
  // Get all contacts
  getAllContacts: () => api.get('/contacts'),
  
  // Get single contact
  getContact: (id) => api.get(`/contacts/${id}`),
  
  // Create new contact
  createContact: (contactData) => {
    console.log('Sending contact data:', contactData);
    return api.post('/contacts', contactData);
  },
  
  // Update contact
  updateContact: (id, contactData) => api.put(`/contacts/${id}`, contactData),
  
  // Delete contact
  deleteContact: (id) => api.delete(`/contacts/${id}`),
  
  // Search contacts
  searchContacts: (query) => api.get(`/contacts/search/${query}`),
};

export default api; 