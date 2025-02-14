import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primarybg:"#efe9d5",
        primaryh:"#27445d",
        primarynav:"#c1ff72",
        primarynavhover:"#9bda4b",
        cardbg:"#497d74"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ]
} satisfies Config;
