import { create } from 'zustand';
import api from '@/utils/api';

export const useUserStore = create((set, get) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    try {
      set({ loading: true });
      const res = await api.get('/admin/users');
      set({ users: res.data });
    } catch (err) {
      alert('Failed to fetch users');
    } finally {
      set({ loading: false });
    }
  },

  addUser: async (user) => {
    await api.post('/admin/users', user);
    await get().fetchUsers();
  },

  updateUser: async (id, updatedUser) => {
    await api.put(`/admin/users/${id}`, updatedUser);
    await get().fetchUsers();
  },

  deleteUser: async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    await api.delete(`/admin/users/${id}`);
    await get().fetchUsers();
  },
}));
