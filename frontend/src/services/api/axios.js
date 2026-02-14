import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor (إضافة التوكن لكل طلب)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (التعامل مع انتهاء الجلسة 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url.includes('/auth/login')) {
      localStorage.clear(); // تنظيف كل البيانات
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// إضافة الخدمات هنا لكي تستخدم كود LoginPage
export const authService = {
  login: async (email, password) => {
    // إرسال الطلب إلى المسار الذي حددته في Backend: /api/auth/login
    const response = await api.post('/auth/login', { email, password });
    
    // تخزين التوكن والبيانات عند النجاح
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data; // سيعيد { token, user }
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }
};

export default api;