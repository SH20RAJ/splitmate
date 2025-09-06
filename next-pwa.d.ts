declare module 'next-pwa' {
  import { NextConfig } from 'next';
  
  interface PWAConfig {
    dest: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
  }
  
  export default function nextPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;
}