/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            fallback: [
                { // Entity image preview fallback
                    source: "/img/entities/:path*",
                    destination: "/img/entities/REDACTED.jpg"
                }
            ]
        }
    }
};

export default nextConfig;
