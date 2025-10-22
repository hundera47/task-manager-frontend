// store/taskStore.js
import { create } from 'zustand';
import api from '../utils/api';

export const useTaskStore = create((set) => ({
  tasks: [],
  fetchTasks: async () => {
    try {
      const res = await api.get('/tasks');
      set({ tasks: res.data });
    } catch (err) {
      console.error('fetchTasks error', err);
    }
  },
  addTask: async (payload) => {
    try {
      await api.post('/tasks', payload);
      const res = await api.get('/tasks');
      set({ tasks: res.data });
    } catch (err) {
      console.error('addTask error', err);
    }
  }
}));
