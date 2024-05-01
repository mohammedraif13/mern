import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { readFileSync } from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: readFileSync('./localhost+2-key.pem'),
      cert: readFileSync('./localhost+2.pem')
    }
  }
});
