/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
import { cupcake } from "daisyui/src/theming/themes";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mascot: {
          ...cupcake,
          primary: "#FFA826",
          secondary: "#93F1B3",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#7378BE",
          "base-200": "#abaed8",
          "base-300": "#e3e4f2",
        },
      },
    ],
  },
};
