import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/utils/api';
import Navbar from '@/components/Navbar';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Register() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      alert('✅ Registration successful! Please log in.');
      router.push('/login');
    } catch (err) {
      alert(err?.response?.data?.error || '❌ Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-10">
        <div className="bg-white shadow p-8 rounded w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">{t('register')}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              name="email"
              placeholder={t('email')}
              value={form.email}
              onChange={handleChange}
              className="border p-2 rounded"
              type="email"
              required
            />
            <input
              name="password"
              placeholder={t('password')}
              value={form.password}
              onChange={handleChange}
              className="border p-2 rounded"
              type="password"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {loading ? '⏳...' : t('register')}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
