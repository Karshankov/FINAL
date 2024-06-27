/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "utfs.io"
        ]
    },
    experimental: {
      serverComponentsExternalPackages: [
          '@react-email/components',
          '@react-email/render',
          '@react-email/tailwind',
          "resend"
      ]
  }

}
module.exports = {
    async redirects() {
      return [
        {
          source: '/cher',
          destination: '../cher/src/App.js', // путь ко второму проекту
          permanent: false,
        },
      ];
    },
  };
  module.exports = {
    reactStrictMode: true,
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ['@react-email/render'],
    },
  };

module.exports = nextConfig
