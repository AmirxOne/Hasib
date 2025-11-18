import type { NextConfig } from "next";

require('dotenv').config({ path: `.env.${process.env.ENV_NAME}` })
console.info(`=> ENV: ${process.env.ENV_NAME}`);

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
};

export default nextConfig;
