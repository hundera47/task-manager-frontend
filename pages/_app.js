// pages/_app.js
import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import nextI18nextConfig from '../next-i18next.config.js';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp, nextI18nextConfig);
