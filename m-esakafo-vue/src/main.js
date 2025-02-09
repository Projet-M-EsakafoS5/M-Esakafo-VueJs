import { createApp, ref, watchEffect, h } from 'vue';  
import App from './App.vue';  
import Login from './components/Login.vue';  
import { auth, onAuthStateChanged } from './firebase';  
import './assets/main.css';  

import { createRouter, createWebHistory } from 'vue-router';  
import Ingredient from './components/Ingredient.vue';  
import Mouvement from './components/Mouvement.vue';

const isAuthenticated = ref(false);  
const isAdmin = ref(false); // Ajoutez une variable pour vérifier si l'utilisateur est admin  

// Vérifie si l'utilisateur est connecté  
onAuthStateChanged(auth, (user) => {  
  isAuthenticated.value = !!user;  
  isAdmin.value = user && user.uid === 'ejQ0HUOcOQdrETBy6k3ZmhI0tOu1'; // Vérifiez si c'est un admin  
});  

// Créer le router  
const router = createRouter({  
  history: createWebHistory(),  
  routes: [  
    { path: '/', component: Login },  
    { path: '/ingredient', component: Mouvement },  
  ],  
});  


// Créer et monter l'application  
const app = createApp(App);  

// Utilisez le router  
app.use(router);  

// Montée de l'application  
app.mount('#app');