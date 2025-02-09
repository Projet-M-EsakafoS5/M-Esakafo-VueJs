import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// export default defineConfig({
//   plugins: [
//     vue(),
//     vueDevTools(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: process.env.VITE_API_URL || 'https://m-esakafo-1.onrender.com',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path
//       }
//     }
//   }
// })

export default defineConfig({  
  plugins: [  
    vue(),  
    vueDevTools(),  
  ],  
  resolve: {  
    alias: {  
      '@': fileURLToPath(new URL('./src', import.meta.url)),  
    },  
  },  
  server: {  
    proxy: {  
      // Redirige les requêtes vers l'API Firebase  
      '/apifire': {  
        target: 'https://identitytoolkit.googleapis.com',  
        changeOrigin: true,  
        secure: false,  
        rewrite: (path) => path.replace(/^\/apifire/, ''), // Retire /api de l'URL  
      },  
      // Vous pouvez garder votre proxy vers votre serveur surrender  
      '/api': {  
        target: process.env.VITE_API_URL || 'https://m-esakafo-1.onrender.com',  
        changeOrigin: true,  
        secure: false,  
        rewrite: (path) => path.replace(/^\/api/, ''), // Retire /your-other-api de l'URL  
      }  
    }  
  }  
});  