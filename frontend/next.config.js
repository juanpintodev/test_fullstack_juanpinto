/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GRAPHQL_URL:
      process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
  },
  experimental: {},
  output: 'standalone',
  trailingSlash: false,
};

module.exports = nextConfig;
