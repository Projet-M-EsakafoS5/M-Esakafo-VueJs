<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Plats',
  setup() {
    const plats = ref([]);  // Tableau pour stocker les plats extraits
    const recette = ref(null);  // Recette du plat sélectionné
    const error = ref(null);  // Pour gérer les erreurs
    const isLoading = ref(false);  // Pour gérer l'état de chargement
    const isModalVisible = ref(false);  // Pour gérer l'affichage de la fenêtre modale

    const fetchPlats = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/plats`, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response.status !== 200) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        plats.value = response.data.data;
        isLoading.value = false;
      } catch (err) {
        error.value = err.message || 'Une erreur est survenue';
        isLoading.value = false;
      }
    };

    const fetchRecette = async (platId) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recettes/plat/${platId}`, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response.status === 200) {
          recette.value = response.data;
          isModalVisible.value = true;  // Affiche la fenêtre modale
        }
      } catch (err) {
        error.value = err.message || 'Une erreur est survenue';
      }
    };

    const closeModal = () => {
      isModalVisible.value = false;  // Ferme la fenêtre modale
      recette.value = null;  // Réinitialise la recette
    };

    onMounted(() => {
      fetchPlats();
    });

    return {
      plats,
      error,
      isLoading,
      recette,
      isModalVisible,
      fetchRecette,
      closeModal
    };
  },
};
</script>

<template>
  <h1>Voici la liste des plats</h1>
  <h2>Cliquez sur chaque plats pour voir leurs recettes</h2>

  <div class="plats-container">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="isLoading" class="loading">Chargement...</div>

    <!-- Conteneur des plats -->
    <div v-else class="plats-grid">
      <div v-for="(plat, index) in plats" :key="plat.id" class="plat-card" @click="fetchRecette(plat.id)">
        <div class="plat-image">
          <img v-bind:src="`/img/${plat.sprite}`" alt="Image du plat" />
        </div>
        <div class="plat-details">
          <h3>{{ plat.nom }}</h3>
          <p>Prix : {{ plat.prix }}€</p>
          <p>Temps de Cuisson : {{ plat.tempsCuisson }} min</p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isModalVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Recette de {{ recette?.plat?.nom }}</h2>
      <div v-for="ingredient in recette" :key="ingredient.id" class="ingredient">
        <p>{{ ingredient.ingredient.nom }} - {{ ingredient.quantite }} {{ ingredient.ingredient.unite.nom }}</p>
        <img v-bind:src="`/img/${ingredient.ingredient.sprite}`" alt="Image ingrédient" width="50" height="50"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #640142;
  font-weight: bold;
  text-align: center;
}
h2 {
  color: #640142;
  text-align: center;
}

.plats-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
}

.error, .loading {
  text-align: center;
  margin-bottom: 20px;
}

/* Conteneur de la grille des plats */
.plats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.plat-card {
  background-color: #640142;
  padding: 15px;
  color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.plat-card .plat-image img {
  background-color: #f9f9f9;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.plat-card .plat-details h3 {
  font-size: 18px;
  color: white;
  margin: 10px 0;
}

.plat-card .plat-details p {
  font-size: 14px;
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
}

.close {
  font-size: 30px;
  color: #640142;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.ingredient {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.ingredient img {
  margin-left: 10px;
  border-radius: 5px;
}

@media (max-width: 768px) {
  .plats-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
