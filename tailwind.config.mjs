/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "terciary-color": "var(--terciary-color)",
        "cuartiary-color": "var(--cuartiary-color)",
        "rojo-color": "var(--rojo-color)",
        "text-color-primary": "var(--text-color-primary)",
        "text-color-secondary": "var(--text-color-secondary)",
        "text-color-terciary": "var(--text-color-terciary)",
      },
    },
  },
  plugins: [],
};
