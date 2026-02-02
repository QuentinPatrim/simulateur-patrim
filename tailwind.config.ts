import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        patrim: {
          bg: "#393939",      // TON GRIS EXACT (Fond principal)
          card: "#393939",    // Utilisé avec transparence pour les cartes
          red: "#8a0e01",     // TON ROUGE EXACT (Boutons forts, accents)
          rose: "#d35f52",    // TON ROSE EXACT (Lueurs, reflets)
        },
        // On garde des gris neutres pour le texte pour la lisibilité
        zinc: {
          100: "#f4f4f5", // Blanc cassé pour texte principal
          400: "#a1a1aa", // Gris clair pour sous-titres
          500: "#71717a", // Gris moyen pour labels
          800: "#27272a", // Gris foncé pour bordures subtiles
        }
      },
      boxShadow: {
        // Ombres teintées avec tes couleurs pour l'effet premium
        'glow-red': '0 0 25px -5px rgba(138, 14, 1, 0.6)',
        'glow-rose': '0 0 30px -5px rgba(211, 95, 82, 0.5)',
      },
    },
  },
  plugins: [],
};
export default config;