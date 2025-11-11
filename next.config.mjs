// next.config.mjs
import pkg from './next-i18next.config.js';
const { i18n } = pkg;

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
};

export default nextConfig;
