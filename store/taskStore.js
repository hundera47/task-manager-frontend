// store/taskStore.js
import { create } from 'zustand';
import api from '@/utils/api';

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  filterStatus: 'all',
  sortBy: 'due_date',

  
  setFilterStatus: (status) => set({ filterStatus: status }),
  setSortBy: (sortBy) => set({ sortBy }),
  
  fetchTasks: async () => {
    try {
      set({ loading: true });
      const res = await api.get('/tasks');
      set({ tasks: res.data });
    } catch (err) {
      console.error('❌ Fetch tasks failed:', err);
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (task) => {
    try {
      await api.post('/tasks', task);
      await get().fetchTasks();
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed to create task');
    }
  },

  updateTask: async (id, updatedData) => {
    try {
      await api.put(`/tasks/${id}`, updatedData);
      await get().fetchTasks();
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed to update task');
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      await get().fetchTasks();
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed to delete task');
    }
  },
}));
