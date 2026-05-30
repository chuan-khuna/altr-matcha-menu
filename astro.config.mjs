// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Cormorant Garamond",
      cssVariable: "--font-cormorant-garamond",
      weights: [300, 400, 500, 600],
      styles: ["normal", "italic"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Lato",
      cssVariable: "--font-lato",
      weights: [400, 700],
      styles: ["normal", "italic"],
      fallbacks: ["system-ui", "sans-serif"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
  // adapter: cloudflare({
  //   imageService: "passthrough",
  //   prerenderEnvironment: "node",
  // }),
});
