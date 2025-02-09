import { createApp, ref } from 'vue';  
import App from './App.vue';  
import Login from './components/Login.vue';  
import { auth, onAuthStateChanged } from './firebase';  
import './assets/main.css';  

import { createRouter, createWebHistory } from 'vue-router';  
import Ingredient from './components/Ingredient.vue';  
import Mouvement from './components/Mouvement.vue';

const isAuthenticated = ref(false);  
const isAdmin = ref(false);  

onAuthStateChanged(auth, (user) => {  
  isAuthenticated.value = !!user;  
  isAdmin.value = user && user.uid === 'ejQ0HUOcOQdrETBy6k3ZmhI0tOu1';
});  

// Définir les routes
const routes = [  
  { path: '/', component: Login },  
  { 
    path: '/ingredient', 
    component: Ingredient, 
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next('/');
      } else {
        next();
      }
    } 
  },  
  { 
    path: '/mouvement', 
    component: Mouvement, 
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next('/');
      } else {
        next();
      }
    } 
  }
];  

const router = createRouter({  
  history: createWebHistory(),  
  routes,  
});  

const app = createApp(App);  
app.use(router);  
app.mount('#app');  
