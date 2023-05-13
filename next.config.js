/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    dest: "public",
    disable: !isProduction,
    runtimeCaching,
});

//withPWA({
//    dest: "public",
//    disable: !isProduction,
//    runtimeCaching,
//});

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
};

module.exports = withPWA(nextConfig);
