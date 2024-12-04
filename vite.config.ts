import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), tsconfigPaths()],
    cacheDir: './.vite',
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    server: { port: 4000 },
    preview: { port: 4000 },
  };
});
