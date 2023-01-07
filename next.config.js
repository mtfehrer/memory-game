/** @type {import('next').NextConfig} */

const repo = "memory-game"
const assetPrefix = `/${repo}/`
const basePath = `/${repo}`

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    assetPrefix: assetPrefix,
    basePath: basePath
};

module.exports = nextConfig;
