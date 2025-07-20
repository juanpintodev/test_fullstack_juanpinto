/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_GRAPHQL_URL:
      process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
