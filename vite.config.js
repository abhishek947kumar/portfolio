import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    host: true, // exposes server to local network (e.g. phone on same Wi-Fi)
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
