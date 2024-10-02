/** @type {import('next').NextConfig} */
const nextConfig = {transpilePackages: ["geist"],serverRuntimeConfig: {
    // This will be available on both server and client sides
    functionMaxDuration: 60 // in seconds
  },
compiler:{
  removeConsole:{
    exclude:["error"]
  }
}};
export default nextConfig;
