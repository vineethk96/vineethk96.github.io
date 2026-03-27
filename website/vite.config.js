import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  resolve: {
    // Array form required: Vite checks aliases in order, so 'posthog-js/react' must come
    // before 'posthog-js' to prevent the shorter prefix from swallowing the subpath import.
    alias: [
      ...(mode !== 'production' ? [
        { find: 'posthog-js/react', replacement: path.resolve(__dirname, 'src/utils/posthog-stub.jsx') },
        { find: 'posthog-js', replacement: path.resolve(__dirname, 'src/utils/posthog-stub.jsx') },
      ] : []),
      // Force single React instance (prevents duplicate hooks from react-three-fiber)
      { find: 'react', replacement: path.resolve(__dirname, 'node_modules/react') },
      { find: 'react-dom', replacement: path.resolve(__dirname, 'node_modules/react-dom') },
    ],
  },
  build: {
    outDir: 'build',  // Preserves existing 'gh-pages -d build' deploy script
  },
  server: {
    port: 3000,
    host: '0.0.0.0',  // Required for Docker container access from host
  },
}));
