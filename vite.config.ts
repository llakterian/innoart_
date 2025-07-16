import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'src/pages/gallery.html'),
        upload: resolve(__dirname, 'src/pages/upload.html'),
        'artist-register': resolve(__dirname, 'src/pages/artist-register.html'),
        profile: resolve(__dirname, 'src/pages/profile.html'),
        'member-artists': resolve(__dirname, 'src/pages/member-artists.html'),
      },
    },
    minify: 'terser',
    sourcemap: false,
  },
  server: {
    port: 3002,
    open: true,
    host: true,
  },
});
