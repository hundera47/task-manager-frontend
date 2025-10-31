import { useTaskStore } from '@/store/taskStore';
import { useTranslation } from 'next-i18next';

export default function TaskList() {
  const { tasks, updateTask, deleteTask, loading, filterStatus, sortBy } = useTaskStore();
  const { t } = useTranslation('common');

  if (loading) return <p>Loading...</p>;

  // filter
  let filtered = tasks;
  if (filterStatus !== 'all') filtered = tasks.filter((t) => t.status === filterStatus);

  // sort
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'due_date') return new Date(a.due_date) - new Date(b.due_date);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return 0;
  });

  if (!filtered.length) return <p>No tasks match your filter.</p>;

  return (
    <div className="grid gap-4">
      {filtered.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{task.title}</h3>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  updateTask(task.id, {
                    ...task,
                    status:
                      task.status === 'completed' ? 'pending' : 'completed',
                  })
                }
                className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
              >
                {task.status === 'completed' ? t('status.pending') : t('status.completed')}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-sm bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-xs text-gray-500 mt-1">
            {t('dueDate')}: {new Date(task.due_date).toLocaleDateString()}
          </p>
          {task.owner_name && (
            <p className="text-xs text-gray-400 mt-1">Owner: {task.owner_name}</p>
          )}
        </div>
      ))}
    </div>
  );
}
