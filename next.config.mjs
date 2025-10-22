// next.config.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const nextI18NextConfig = require('./next-i18next.config.js');

const nextConfig = {
  ...nextI18NextConfig,
  reactStrictMode: true,
};

export default nextConfig;
