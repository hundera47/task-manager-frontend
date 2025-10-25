import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { useTranslation } from 'next-i18next';

export default function TaskForm() {
  const { addTask } = useTaskStore();
  const { t } = useTranslation('common');
  const [form, setForm] = useState({ title: '', description: '', due_date: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addTask(form);
    setForm({ title: '', description: '', due_date: '' });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-3">
      <input
        name="title"
        placeholder={t('title')}
        value={form.title}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <textarea
        name="description"
        placeholder={t('description')}
        value={form.description}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="date"
        name="due_date"
        value={form.due_date}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? '⏳...' : t('createTask')}
      </button>
    </form>
  );
}
