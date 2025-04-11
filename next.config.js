/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure static assets are properly handled
  webpack: (config) => {
    return config;
  },
  // Configure output directory for static assets
  distDir: '.next',
  // Ensure proper handling of environment variables
  env: {
    NEXT_PUBLIC_TELEGRAM_BOT_TOKEN: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN,
    NEXT_PUBLIC_TELEGRAM_CHAT_ID: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
  },
};

module.exports = nextConfig; 