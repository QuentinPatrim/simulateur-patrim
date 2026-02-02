import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // On autorise les images venant de votre site officiel
      {
        protocol: "https",
        hostname: "www.patrim.fr",
      },
      // On garde Unsplash au cas où
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;