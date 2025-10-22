// components/LanguageSwitcher.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locales, locale, asPath } = router;
  const { t } = useTranslation('common');

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{t('language')}:</span>
      {locales.map((loc) => (
        <Link
            key={loc}
            href={asPath}
            locale={loc}
            className={`px-2 py-1 rounded cursor-pointer ${
                loc === locale ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            >
            {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
