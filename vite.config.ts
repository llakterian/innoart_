import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: './', // Use relative paths for deployment
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'src/pages/gallery.html'),
        upload: resolve(__dirname, 'src/pages/upload.html'),
        'artist-register': resolve(__dirname, 'src/pages/artist-register.html'),
      },
    },
    // Optimize for production
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'components'),
      '@hooks': resolve(__dirname, 'hooks'),
      '@contracts': resolve(__dirname, 'contracts'),
    },
  },
  define: {
    // Define global constants
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  optimizeDeps: {
    include: ['web3', 'nft.storage'],
  },
  // Handle environment variables
  envPrefix: 'VITE_',
});
