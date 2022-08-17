/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_API_PAYPAL_KEY: `${process.env.NEXT_API_PAYPAL_KEY}`,
    NEXT_API_STRIPE_KEY: `${process.env.NEXT_API_STRIPE_KEY}`
  }
}

module.exports = nextConfig
