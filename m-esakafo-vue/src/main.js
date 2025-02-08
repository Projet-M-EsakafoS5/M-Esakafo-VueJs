import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import MouvementEdit from './components/MouvementEdit.vue';

// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//       { path: '/edit-mouv/:id', component: MouvementEdit },
//     ],
//   });

  createApp(App).mount('#app');
//   createApp(App).use(router).mount('#app');
