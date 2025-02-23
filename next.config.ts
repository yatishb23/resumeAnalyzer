import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  env: {
    GEMINI_KEY: process.env.GEMINI_KEY,
  },
};
export default nextConfig;
