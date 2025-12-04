import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      underscore: "lodash",
    },
  },
  serverExternalPackages: ['thread-stream', 'pino'],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
