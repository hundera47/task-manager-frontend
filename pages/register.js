import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/utils/api';
import Navbar from '@/components/Navbar';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Register() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      alert('Registered — please login');
      router.push('/login');
    } catch (err) {
      alert(err?.response?.data?.error || 'Register failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h3 className="text-xl font-semibold mb-4">{t('register')}</h3>
        <form onSubmit={handle} className="flex flex-col gap-3">
          <input className="p-2 border" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="p-2 border" placeholder={t('email')} value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" className="p-2 border" placeholder={t('password')} value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button className="bg-green-600 text-white px-4 py-2 rounded">{t('register')}</button>
        </form>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
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