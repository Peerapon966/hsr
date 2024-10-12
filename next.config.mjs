import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pino", "pino-pretty"], // tell webpack to include these packages when building or else, MODULE_NOT_FOUND error
  },
  assetPrefix: process.env.ASSET_PREFIX,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fastcdn.hoyoverse.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "hsr.hoyoverse.click",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
