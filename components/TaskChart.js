import { useTaskStore } from '@/store/taskStore';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'next-i18next';

export default function TaskChart() {
  const { tasks } = useTaskStore();
  const { t } = useTranslation('common');

  const data = [
    { name: t('status.pending'), value: tasks.filter((t) => t.status === 'pending').length },
    { name: t('status.in_progress'), value: tasks.filter((t) => t.status === 'in_progress').length },
    { name: t('status.completed'), value: tasks.filter((t) => t.status === 'completed').length },
  ];

  const COLORS = ['#facc15', '#3b82f6', '#22c55e'];

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="font-semibold mb-4 text-center">Task Status Summary</h3>
      <PieChart width={400} height={260}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
