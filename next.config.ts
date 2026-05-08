// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // This is the critical fix for Prisma + Turbopack
  serverExternalPackages: ['@prisma/client'], 
};

export default nextConfig;