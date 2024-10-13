/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            fallback: [
                { // Entity image preview fallback
                    source: "/img/entities/:path*",
                    destination: "/img/entities/REDACTED.jpg"
                }
            ],
            beforeFiles: [
                {
                    source: "/:path*",
                    has: [
                        {
                            "type": "host",
                            "value": "kvba-scp.pages.dev"
                        }
                    ],
                    destination: "https://scp.kuba.lol/:path*",
                    permanent: true
                }
            ]
        }
    }
};

export default nextConfig;
