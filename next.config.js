
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    // This is the correct way to allow cross-origin requests in development.
    allowedDevOrigins: [
      "https://9000-firebase-freshflour-1764879510997.cluster-va5f6x3wzzh4stde63ddr3qgge.cloudworkstations.dev"
    ],
  },
};

module.exports = nextConfig;
