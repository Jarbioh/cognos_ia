/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ['@mui/material', '@mui/icons-material'] },
  images: {
    // Se usar somente imagens locais em /public, não precisa configurar domains
    formats: ['image/avif', 'image/webp']
  },
  headers: async () => ([
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
      ]
    }
  ])
};
module.exports = nextConfig;
