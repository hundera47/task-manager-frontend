import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { useTaskStore } from '@/store/taskStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Dashboard() {
  const router = useRouter();
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        {tasks.length === 0 ? (
          <div>No tasks yet</div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((t) => (
              <div key={t.id} className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold">{t.title}</h4>
                <p>{t.description}</p>
              </div>
            ))}
          </div>
        )}
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
