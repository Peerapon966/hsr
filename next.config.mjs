/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pino", "pino-pretty"], // tell webpack to include these packages when building or else, MODULE_NOT_FOUND error
  },
};

export default nextConfig;
