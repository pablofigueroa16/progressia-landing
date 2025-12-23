/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['shared', 'database'],
  images: {
    domains: ['localhost', 'avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig

