// next.config.mjs
import nextI18NextConfig from './next-i18next.config.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...nextI18NextConfig, // ✅ spread the whole config (works with CommonJS)
  reactStrictMode: true,
};

export default nextConfig;
