import { useTaskStore } from '@/store/taskStore';
import { useTranslation } from 'next-i18next';

export default function TaskList() {
  const { tasks, updateTask, deleteTask, loading } = useTaskStore();
  const { t } = useTranslation('common');

  if (loading) return <p>Loading...</p>;
  if (!tasks.length) return <p>No tasks yet.</p>;

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{task.title}</h3>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  updateTask(task.id, {
                    ...task,
                    status:
                      task.status === 'completed'
                        ? 'pending'
                        : 'completed',
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
        </div>
      ))}
    </div>
  );
}
