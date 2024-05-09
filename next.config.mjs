/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com"
        ]
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Add a rule to include files from the app folder
        config.module.rules.push({
            test: /\.(js|jsx|ts|tsx)$/,
            include: [new URL('app', import.meta.url).pathname],
            use: defaultLoaders.babel,
        });

        return config;
    },
};

export default nextConfig;
