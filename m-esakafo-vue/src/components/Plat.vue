<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Plats',
  setup() {
    const plats = ref([]);
    const recette = ref(null);
    const error = ref(null);
    const isLoading = ref(false);
    const isModalVisible = ref(false);

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
      } catch (err) {
        error.value = err.message || 'Une erreur est survenue';
      } finally {
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
          recette.value = response.data[0];
          isModalVisible.value = true;
        }
      } catch (err) {
        error.value = err.message || 'Une erreur est survenue';
      }
    };

    const closeModal = () => {
      isModalVisible.value = false;
      recette.value = null;
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

  <div class="plats-container">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="isLoading" class="loading">Chargement...</div>

    <div v-else class="plats-grid">
      <div v-for="plat in plats" :key="plat.id" class="plat-card">
        <div class="plat-image">
          <img :src="`/img/${plat.sprite}`" alt="Image du plat" />
        </div>
        <div class="plat-details">
          <h3>{{ plat.nom }}</h3>
          <p>Prix : {{ plat.prix }}€</p>
          <p>Temps de Cuisson : {{ plat.tempsCuisson }} min</p>
          <button @click="fetchRecette(plat.id)" class="recette-button">Voir Recette</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isModalVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Recette de {{ recette?.platNom }}</h2>
      <div v-for="ingredient in recette?.ingredients" :key="ingredient.id" class="ingredient">
        <p>{{ ingredient.nom }} - {{ ingredient.quantite }} {{ ingredient.unite.nom }}</p>
        <img :src="`/img/${ingredient.sprite}`" alt="Image ingrédient" width="50" height="50"/>
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

.recette-button {
  background-color:rgb(228, 146, 4);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
}

.recette-button:hover {
  background-color: #e64a19;
}
</style>