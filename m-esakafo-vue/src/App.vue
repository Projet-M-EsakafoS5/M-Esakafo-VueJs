<script setup>
import { ref } from 'vue';
import Plat from './components/Plat.vue';
import Ingredient from './components/Ingredient.vue';
import Commande from './components/Commande.vue';
import Dashboard from './components/Dashboard.vue';
import Mouvement from './components/Mouvement.vue';
import Recette from './components/Recette.vue';
import Login from './components/Login.vue';

const currentSection = ref('dashboards');// Par défaut, on affiche "plats"
</script>


<template>
  <div class="content">
    <!-- Barre de navigation à gauche -->
    <nav class="sidebar">
      <img :src="`src/img/1Logo.png`" alt="Plat" class="logo" />
      <ul>
        <li><a href="" @click.prevent="currentSection = 'dashboards'">Dashboard</a></li>
        <li><a href="" @click.prevent="currentSection = 'plats'">Plats</a></li>
        <li><a href="" @click.prevent="currentSection = 'commande'">Commandes</a></li>
        <li><a href="" @click.prevent="currentSection = 'ingredients'">Ingrédients</a></li>

        <li><a href="" @click.prevent="currentSection = 'mouvements'">Liste mouvements</a></li>
        <li><a href="" @click.prevent="currentSection = 'recettes'">Liste recettes</a></li>
        <li><a href="" @click.prevent="currentSection = 'login'">Login BackOffice</a></li>
      </ul>
    </nav>

    <!-- Contenu principal -->
    <main>
      <Dashboard v-if="currentSection === 'dashboards'" />
      <Plat v-if="currentSection === 'plats'" />
      <Ingredient v-if="currentSection === 'ingredients'" />
      <Commande v-if="currentSection === 'commande'" />

      <Mouvement v-if="currentSection === 'mouvements'" />
      <Recette v-if="currentSection === 'recettes'" />
      <Login v-if="currentSection === 'login'" />

    </main>
  </div>
</template>


<style scoped>
/* Corps de la page */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

/* Contenu principal avec sidebar */
.content {
  display: flex;
  height: 100vh; /* Prendre toute la hauteur de la fenêtre */
}

/* Sidebar fixe */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background-color: #6a4c9c; /* Couleur de fond violet */
  padding: 20px;
  color: white;
  z-index: 1000; /* Assurez-vous que la sidebar reste au-dessus */
}

.logo{
  width: 100px;
  margin-left: 45px;
  padding-bottom: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 20px;
}

.sidebar ul li a {
  text-decoration: none;
  color: white;
  font-size: 18px;
}

.sidebar ul li a:hover {
  background-color: #6a4c9c;
  color: #f39c12; /* Orange au survol */
}


main {
  margin-left: 90px; /* Décalage pour que le contenu principal ne chevauche pas la sidebar */
  width: 100%;
  padding: 20px;
  background-color: #fff;
  height: 100vh;
}

/* Titres */
header h1 {
  text-align: center;
  background-color: #6a4c9c;
  color: white;
  padding: 10px;
  margin: 0;
}
</style>
