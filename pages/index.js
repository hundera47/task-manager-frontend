import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-8">
        <h2 className="text-2xl font-bold">Welcome — open /login or /register</h2>
        <div className="mt-4">
          <Link href="/login" className="mr-4 text-blue-600">
            Login
          </Link>
          <Link href="/register" className="text-blue-600">
            Register
          </Link>

        </div>
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
