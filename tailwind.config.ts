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
        background: "#FAF6F0", // Soft Cream & Warm Sand
        surface: {
          DEFAULT: "#F4ECE1", // Warm Natural Surface
          dark: "#1B3B2B",    // Botanical Forest Accent Surface
          charcoal: "#2C2E2B",// Earthy Soft Charcoal
        },
        card: "#FFFFFF",
        primary: {
          DEFAULT: "#B85D36", // Warm Terracotta Clay (Primary Brand Color)
          dark: "#9E4A28",
          light: "#D87A52",
        },
        terracotta: {
          DEFAULT: "#B85D36", // Warm Terracotta
          dark: "#9E4A28",
          soft: "#E89B79",
        },
        copper: {
          DEFAULT: "#B85D36", // Terracotta Copper
          dark: "#9E4A28",
          soft: "#E89B79",
        },
        forest: {
          DEFAULT: "#1B3B2B", // Botanical Deep Forest
          rich: "#142E21",
          light: "#28523C",
          accent: "#376B50",
        },
        teak: {
          DEFAULT: "#4A3525", // Solid Teakwood
          dark: "#332317",
          light: "#6E503B",
        },
        charcoal: {
          DEFAULT: "#2C2E2B", // Earthy Charcoal
          rich: "#1F211E",
          muted: "#636660",
          light: "#A3A7A0",
        },
        ivory: {
          DEFAULT: "#FAF6F0",
          warm: "#F2E8DB",
          sand: "#E5D7C4",
        },
        gold: {
          DEFAULT: "#C69C4E", // Natural Brass / Ochre Accent
          soft: "#E6C98A",
          dark: "#997531",
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(44, 46, 43, 0.06)',
        'elevated': '0 20px 50px -15px rgba(44, 46, 43, 0.12)',
        'glow-terracotta': '0 0 30px rgba(184, 93, 54, 0.25)',
        'glow-green': '0 0 40px rgba(27, 59, 43, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2.5rem',
      }
    },
  },
  plugins: [],
};
export default config;
