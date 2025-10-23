import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/utils/api';
import Navbar from '@/components/Navbar';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Login() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      alert('✅ Logged in successfully');
      router.push('/dashboard');
    } catch (err) {
      alert(err?.response?.data?.error || '❌ Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-10">
        <div className="bg-white shadow p-8 rounded w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">{t('login')}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? '⏳...' : t('login')}
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
