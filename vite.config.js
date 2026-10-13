import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // "@/..." means "src/..." (also set in vitest.config.js and jsconfig.json), so imports never climb with "../../"
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: {
    // React and the router change rarely, so keeping them in their own file lets browsers cache them across releases
    rollupOptions: { output: { manualChunks: { vendor: ["react", "react-dom", "react-router-dom"] } } },
  },
});
