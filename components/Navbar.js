import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'next-i18next';

export default function Navbar() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [role, setRole] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Run only in browser (after hydration)
    setIsClient(true);
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      {/* ✅ Clickable App Title */}
      <Link href="/" className="text-lg font-bold text-blue-600 hover:underline">
        {t('appTitle')}
      </Link>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />

        <button
          onClick={handleLogout}
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
          {t('logout')}
        </button>

        {/* ✅ Show admin badge only after client loads */}
        {isClient && role === 'admin' && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {t('admin')}
          </span>
        )}
      </div>
    </nav>
  );
}
