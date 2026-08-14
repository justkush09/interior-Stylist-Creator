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
        background: "#FBF9F5", // Warm Ivory
        surface: "#F2ECE4",    // Muted Sand
        card: "#FFFFFF",       // Pure White
        primary: {
          DEFAULT: "#C86D51", // Terracotta Accent
          dark: "#A8533B",
          light: "#E89B83",
        },
        earth: {
          DEFAULT: "#2C3E35", // Deep Forest Earth
          muted: "#4A5D53",
        },
        charcoal: {
          DEFAULT: "#1F1F1F", // Soft Charcoal
          muted: "#666666",
          light: "#999999",
        },
        gold: {
          DEFAULT: "#D4AF37", // Warm Muted Gold
          soft: "#F4E8C1",
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(44, 62, 53, 0.08)',
        'elevated': '0 20px 40px -15px rgba(31, 31, 31, 0.12)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};
export default config;
