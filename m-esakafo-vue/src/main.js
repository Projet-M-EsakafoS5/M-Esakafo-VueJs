import { createApp, ref } from 'vue';  
import App from './App.vue';  
import Login from './components/Login.vue';  
import Acceuil from './Acceuil.vue';
import 'font-awesome/css/font-awesome.css';

import { auth, onAuthStateChanged } from './firebase';  
import './assets/main.css';  

import { createRouter, createWebHistory } from 'vue-router';  
import Ingredient from './components/Ingredient.vue';  
import Mouvement from './components/Mouvement.vue';
import Dashboard from './components/Dashboard.vue';
import Commande from './components/Commande.vue';
import Plat from './components/Plat.vue';
import Clients from './components/Clients.vue';



const isAuthenticated = ref(false);  
const isAdmin = ref(false);  

onAuthStateChanged(auth, (user) => {  
  isAuthenticated.value = !!user;  
  isAdmin.value = user && user.uid === 'ejQ0HUOcOQdrETBy6k3ZmhI0tOu1';
});  

const routes = [  
  { path: '/', component: Login },  
  { 
    path: '/acceuil', 
    component: Acceuil, 
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next('/');
      } else {
        next();
      }
    }, 
    children: [
      { path: 'ingredient', component: Ingredient },
      { path: 'commande', component: Commande },
      { path: 'plats', component: Plat },
      { path: 'mouvement', component: Mouvement },
      { path: 'dashboard', component: Dashboard },
      { path: 'clients', component: Clients }
    ]
  }
];  

const router = createRouter({  
  history: createWebHistory(),  
  routes,  
});  

const app = createApp(App);  
app.use(router);  
app.mount('#app');  
