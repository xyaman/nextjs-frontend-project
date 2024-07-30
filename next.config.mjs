/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/new',
        destination: '/edit',
        permanent: true,
      },
      {
        source: '/add',
        destination: '/edit',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
