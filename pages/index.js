import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useTranslation('common');
  const appName = t('appTitle');

  const features = [
    {
      title: t('feature1_title'),
      desc: t('feature1_desc'),
      icon: '✅',
    },
    {
      title: t('feature2_title'),
      desc: t('feature2_desc'),
      icon: '🤝',
    },
    {
      title: t('feature3_title'),
      desc: t('feature3_desc'),
      icon: '📊',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              {t('welcomeTitle', { appName: appName })}
            </h1>
            <p className="text-gray-600 mt-4 text-lg">{t('welcomeSubtitle')}</p>

            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                href="/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                {t('getStarted')}
              </Link>
              <Link
                href="/login"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                {t('login')}
              </Link>
            </div>
          </motion.div>

        <motion.img
          src="/images/hero.png"
          alt="Contact Manager Illustration"
          className="w-72 md:w-96 mt-10 md:mt-0"
        />
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto py-20 px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {t('whyChoose', { appName: appName })}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-600 text-white py-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} {appName} — {t('footer')}
          </p>
        </footer>
      </main>
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
