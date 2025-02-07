<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Ingredients',
  setup() {
    const ingredients = ref([]);  // Tableau pour stocker les ingrédients extraits
    const error = ref(null);  // Pour gérer les erreurs
    const isLoading = ref(false);  // Pour gérer l'état de chargement

    const fetchIngredients = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/ingredients`, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response.status !== 200) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        // Assigner les données récupérées à la variable `ingredients`
        ingredients.value = response.data.data;

        isLoading.value = false;
      } catch (err) {
        if (err.response && err.response.status === 429) {
          const retryAfter = err.response.headers['retry-after'];
          error.value = `Trop de requêtes. Veuillez attendre ${retryAfter ? retryAfter : 'un peu'} avant de réessayer.`;
        } else {
          error.value = err.message || 'Une erreur est survenue';
        }
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchIngredients();
    });

    return {
      ingredients,
      error,
      isLoading,
    };
  },
};
</script>

<template>
     <h1><b>Voici la liste des ingrédients</b></h1>
  <div class="ingredients-container">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="isLoading" class="loading">Chargement...</div>
   
    <div v-else class="ingredients-grid">
      <div v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-card">
        <img :src="`/src/img/${ingredient.sprite}`" alt="Image de l'ingrédient" class="ingredient-image" />
        <div class="ingredient-description">{{ ingredient.nom }} ({{ ingredient.unite.nom }})</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1{
    color: #6a4c9c;
}
.ingredients-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.ingredients-grid {
  display: flex; /* Utiliser flex au lieu de grid */
  flex-wrap: wrap; /* Pour que les éléments se replient si l'espace est insuffisant */
  gap: 20px; /* Espacement entre les éléments */
  width: 100%;
}

.ingredient-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  color: #6a4c9c;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 0 1 200px; /* L'élément aura une largeur minimale de 200px, mais pourra se réduire ou se développer */
}

.ingredient-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.ingredient-description {
  margin-top: 10px;
  font-size: 14px;
  color: #6a4c9c;
}

.error, .loading {
  text-align: center;
  margin-bottom: 20px;
}

</style>
