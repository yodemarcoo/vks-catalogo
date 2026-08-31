import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  base: '/vks-catalogo/',
  plugins: [solidPlugin()],
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
