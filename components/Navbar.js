// components/Navbar.js
import { useRouter } from 'next/router';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'next-i18next';

export default function Navbar() {
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <div className="text-lg font-bold text-blue-600">{t('appTitle')}</div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-500 text-white">
          {t('logout')}
        </button>
      </div>
    </nav>
  );
}
