import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const profileAPI = {
  getProfile: () => api.get('/profile'),
  getComments: (profileId: string) => api.get(`/comments?profile_id=${profileId}`),
  createComment: (data: any) => api.post('/comments', data),
  deleteComment: (id: number) => api.delete(`/comments/${id}`),
};

export default api;