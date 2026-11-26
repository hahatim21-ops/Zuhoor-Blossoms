import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          plum: "#1a3d2a",
          rose: "#4a8c6a",
          blush: "#c0dccb",
          cream: "#f3f7f4",
          sand: "#cfe0d5",
          charcoal: "#121e18",
          muted: "#5e7069",
          gold: "#c9a84c",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-amiri)", "serif"],
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
