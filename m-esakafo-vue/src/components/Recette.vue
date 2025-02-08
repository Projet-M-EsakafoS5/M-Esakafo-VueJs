<template>
    <div>
      <h1>Liste des Recettes</h1>
      
      <div v-if="isLoading">Chargement des recettes...</div>
      <div v-if="error">{{ error }}</div>
      
      <ul v-if="!isLoading && !error">
        <li v-for="recette in recettes" :key="recette.id">
          <h2>{{ recette.plat.nom }}</h2>
          <img :src="recette.plat.sprite" alt="Image du plat" />
          <p>Prix : {{ recette.plat.prix }}€</p>
          <p>Temps de cuisson : {{ recette.plat.tempsCuisson }}</p>
          
          <h3>Ingrédients :</h3>
          <ul>
            <li>
              {{ recette.ingredient.nom }} - {{ recette.quantite }} {{ recette.ingredient.unite.nom }}
              <img :src="recette.ingredient.sprite" alt="Image de l'ingrédient" />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'Recettes',
    setup() {
      const recettes = ref([]);
      const error = ref(null);
      const isLoading = ref(false);
  
      const fetchRecettes = async () => {
  isLoading.value = true;
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/recettes`;  
    console.log('Fetching data from:', url);  
    
    const response = await axios.get(url, { 
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    recettes.value = response.data;
    console.log('Recettes:', recettes.value); // Ajoutez cette ligne
  } catch (err) {
    error.value = "Erreur lors du chargement des recettes";
    console.error(err); // Affiche l'erreur dans la console pour le débogage
  } finally {
    isLoading.value = false;
  }
};  
      onMounted(() => {
          fetchRecettes();
      });
  
      return {
        recettes,
        error,
        isLoading,
      };
    },
  };
  </script>