import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // tell webpack to include these packages (pino, pino-pretty and its dependencies) when building or else, MODULE_NOT_FOUND error
    serverComponentsExternalPackages: ["pino", "pino-pretty"],
    outputFileTracingExcludes: [
      ".cache/**",
      ".github/workflows/**",
      ".next/**",
      "coverage/**",
      "db/**",
      "jest/**",
      "logs/**",
    ],
    outputFileTracingIncludes: {
      "/api/auth/*": [
        "node_modules/args/**",
        "node_modules/camelcase/**",
        "node_modules/chalk/**",
        "node_modules/colorette/**",
        "node_modules/dateformat/**",
        "node_modules/end-of-stream/**",
        "node_modules/fast-copy/**",
        "node_modules/fast-safe-stringify/**",
        "node_modules/joycon/**",
        "node_modules/leven/**",
        "node_modules/mri/**",
        "node_modules/pino-pretty/**",
        "node_modules/pump/**",
        "node_modules/once/**",
        "node_modules/rfdc/**",
        "node_modules/secure-json-parse/**",
        "node_modules/strip-json-comments/**",
        "node_modules/wrappy/**",
      ],
    },
  },

  output: "standalone",
  assetPrefix: process.env.ASSET_PREFIX,
  images: {
    unoptimized: true,
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
      {
        protocol: "https",
        hostname: "webstatic.hoyoverse.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
