/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static-testnet.unisat.io",
        port: "",
        pathname: "/preview/**",
      },
      {
        protocol: "https",
        hostname: "static.unisat.io",
        port: "",
        pathname: "/preview/**",
      },
      {
        protocol: "https",
        hostname: "algonrich-s3-bucket.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "testnet-explorer.ordinalsbot.com",
        port: "",
        pathname: "/content/**",
      },
      {
        protocol: "https",
        hostname: "testnet.ordinals.com",
        port: "",
        pathname: "/content/**",
      },
      {
        protocol: "https",
        hostname: "explorer.ordinalsbot.com",
        port: "",
        pathname: "/content/**",
      },
      {
        protocol: "https",
        hostname: "img-cdn.magiceden.dev",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ordvision.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/testnet/**",
      },
      {
        protocol: "https",
        hostname: "ordvision.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/mainnet/**",
      },
      {
        protocol: "https",
        hostname: "ordvision.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/dex-testnet/**",
      },
      {
        protocol: "https",
        hostname: "ordvision.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/dex-mainnet/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  output: "standalone",

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "strict-transport-security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
