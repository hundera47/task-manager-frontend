import { useTaskStore } from '@/store/taskStore';
import { useTranslation } from 'next-i18next';

export default function TaskControls() {
  const { filterStatus, setFilterStatus, sortBy, setSortBy } = useTaskStore();
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-wrap gap-3 mb-6 items-center">
      <div>
        <label className="mr-2 font-medium">{t('status')}:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="all">All</option>
          <option value="pending">{t('status.pending')}</option>
          <option value="in_progress">{t('status.in_progress')}</option>
          <option value="completed">{t('status.completed')}</option>
        </select>
      </div>

      <div>
        <label className="mr-2 font-medium">Sort By:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="due_date">Due Date</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  );
}
