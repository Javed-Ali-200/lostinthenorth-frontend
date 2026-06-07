import axios from 'axios';
import type { Tour, Hotel, Car, Trekking, Booking, CustomTrip, BookingFormData, AuthResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to admin requests
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('admin_token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle expired tokens with Refresh Token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('admin_refresh_token');
                if (!refreshToken) throw new Error('No refresh token');

                // Using direct Axios instance to avoid interceptor loop
                const res = await axios.post(`${API_URL}/admin/refresh`, { refreshToken });
                
                if (res.data.success) {
                    const { token, refreshToken: newRefreshToken } = res.data.data;
                    
                    localStorage.setItem('admin_token', token);
                    localStorage.setItem('admin_refresh_token', newRefreshToken);
                    
                    // Update header and retry
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed - log out user
                localStorage.removeItem('admin_token');
                localStorage.removeItem('admin_refresh_token');
                localStorage.removeItem('admin_user');
                if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                    window.location.href = '/admin/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

// ─── Tours ────────────────────────────────────────────────────────────────────
export const tourApi = {
    getAll: (params?: Record<string, string>) =>
        api.get<{ success: boolean; data: Tour[] }>('/tours', { params }),
    getById: (id: string) =>
        api.get<{ success: boolean; data: Tour }>(`/tours/${id}`),
    create: (data: FormData) =>
        api.post<{ success: boolean; data: Tour }>('/tours', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    update: (id: string, data: FormData) =>
        api.patch<{ success: boolean; data: Tour }>(`/tours/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    delete: (id: string) => api.delete(`/tours/${id}`),
};

// ─── Hotels ───────────────────────────────────────────────────────────────────
export const hotelApi = {
    getAll: (params?: Record<string, string>) =>
        api.get<{ success: boolean; data: Hotel[] }>('/hotels', { params }),
    getById: (id: string) =>
        api.get<{ success: boolean; data: Hotel }>(`/hotels/${id}`),
    create: (data: FormData) =>
        api.post<{ success: boolean; data: Hotel }>('/hotels', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    update: (id: string, data: FormData) =>
        api.patch<{ success: boolean; data: Hotel }>(`/hotels/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    delete: (id: string) => api.delete(`/hotels/${id}`),
};

// ─── Cars ─────────────────────────────────────────────────────────────────────
export const carApi = {
    getAll: (params?: Record<string, string>) =>
        api.get<{ success: boolean; data: Car[] }>('/cars', { params }),
    getById: (id: string) =>
        api.get<{ success: boolean; data: Car }>(`/cars/${id}`),
    create: (data: FormData) =>
        api.post<{ success: boolean; data: Car }>('/cars', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    update: (id: string, data: FormData) =>
        api.patch<{ success: boolean; data: Car }>(`/cars/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    delete: (id: string) => api.delete(`/cars/${id}`),
};

// ─── Trekkings ────────────────────────────────────────────────────────────────
export const trekkingApi = {
    getAll: (params?: Record<string, string>) =>
        api.get<{ success: boolean; data: Trekking[] }>('/trekkings', { params }),
    getById: (id: string) =>
        api.get<{ success: boolean; data: Trekking }>(`/trekkings/${id}`),
    create: (data: FormData) =>
        api.post<{ success: boolean; data: Trekking }>('/trekkings', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    update: (id: string, data: FormData) =>
        api.patch<{ success: boolean; data: Trekking }>(`/trekkings/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    delete: (id: string) => api.delete(`/trekkings/${id}`),
};

// ─── Bookings ──────────────────────────────────────────────────────────────────
export const bookingApi = {
    create: (data: BookingFormData) =>
        api.post<{ success: boolean; data: Booking }>('/bookings', data),
    getAll: (params?: Record<string, string>) =>
        api.get<{ success: boolean; data: Booking[] }>('/bookings/admin', { params }),
    getById: (id: string) =>
        api.get<{ success: boolean; data: Booking }>(`/bookings/admin/${id}`),
    updateStatus: (id: string, status: string) =>
        api.patch(`/bookings/admin/${id}/status`, { status }),
};

// ─── Custom Trips ──────────────────────────────────────────────────────────────
export const customTripApi = {
    create: (data: FormData) =>
        api.post<{ success: boolean; data: CustomTrip }>('/custom-trips', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    getAll: (params?: Record<string, string>) =>
        api.get<{ success: boolean; data: CustomTrip[] }>('/custom-trips/admin', { params }),
    update: (id: string, data: Partial<CustomTrip>) =>
        api.patch(`/custom-trips/admin/${id}`, data),
};

// ─── Admin Auth ────────────────────────────────────────────────────────────────
export const adminApi = {
    login: (email: string, password: string) =>
        api.post<{ success: boolean; data: AuthResponse }>('/admin/login', { email, password }),
    getProfile: () =>
        api.get<{ success: boolean; data: AuthResponse['admin'] }>('/admin/profile'),
    refresh: (refreshToken: string) =>
        api.post<{ success: boolean; data: { token: string; refreshToken: string } }>('/admin/refresh', { refreshToken }),
};

export default api;
