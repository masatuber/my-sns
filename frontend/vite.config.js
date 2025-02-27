import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const allowedOrigins = ['http://localhost:5000', 'http://localhost:3000'];

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    cors: {
      origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
          // 許可するオリジンの場合は true を返す
          callback(null, true);
        } else {
          // 許可しない場合は false を返す、またはエラーを返す
          callback(null, false);
          // エラーとして返す場合は次のようにもできる:
          // callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
