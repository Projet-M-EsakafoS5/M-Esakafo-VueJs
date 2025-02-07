<script setup>
import { ref } from 'vue';
import Plat from './components/Plat.vue';
import Ingredient from './components/Ingredient.vue';
import Commande from './components/Commande.vue';
const currentSection = ref('plats');// Par défaut, on affiche "plats"
</script>

<template>
  <div class="content">
    <!-- Barre de navigation à gauche -->
    <nav class="sidebar">
      <ul>
        <li><h1><b>M-Esakafo</b></h1></li>
        <li><a href="" @click.prevent="currentSection = 'plats'">Plats</a></li>
        <!-- <li><a href="" @click.prevent="currentSection = 'commande'">Commande</a></li> -->
        <li><a href="" @click.prevent="currentSection = 'ingredients'">Ingrédients</a></li>
      </ul>
    </nav>

    <!-- Contenu principal -->
    <main>
      <!-- Affichage dynamique des composants en fonction de la section active -->
      <Plat v-if="currentSection === 'plats'" />
      <Ingredient v-if="currentSection === 'ingredients'" />
      <!-- <Commande v-if="currentSection === 'commande'" /> -->
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
