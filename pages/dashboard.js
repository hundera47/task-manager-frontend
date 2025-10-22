import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useTaskStore } from '@/store/taskStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Dashboard() {
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="mt-4 grid gap-4">
          {tasks.length === 0 ? <div>No tasks</div> : tasks.map(t => (
            <div key={t.id} className="p-4 bg-white rounded shadow">
              <h4 className="font-semibold">{t.title}</h4>
              <p className="text-sm">{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
