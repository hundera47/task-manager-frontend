import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import AdminUserPanel from '@/components/AdminUserPanel';
import { useTaskStore } from '@/store/taskStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Dashboard() {
  const router = useRouter();
  const { fetchTasks } = useTaskStore();
  const { t } = useTranslation('common');
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (!token) {
      router.push('/login');
      return;
    }
    setRole(storedRole);
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">
          {t('appTitle')} - Dashboard
        </h2>

        {/* Normal user area */}
        <TaskForm />
        <TaskList />

        {/* Admin-only panel */}
        {role === 'admin' && <AdminUserPanel />}
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
