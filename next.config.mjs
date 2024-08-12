/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*' // Proxy to Backend
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ['pino', 'pino-pretty'] // tell webpack to include these packages when building or else, MODULE_NOT_FOUND error
  },
}


export default nextConfig;
