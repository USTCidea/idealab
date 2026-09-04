import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/idealab/", // Add prefix to all static asset paths
  build: {
    outDir: "docs",
    // 每次构建前清空 docs，避免残留旧的 hash 资源（assets/*.js 等）
    emptyOutDir: true,
  },
});
