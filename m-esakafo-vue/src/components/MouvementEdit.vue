<template>
    <div>
      <h2>Édition du Mouvement</h2>
  
      <div v-if="isLoading">Chargement des détails du mouvement...</div>
      <div v-if="error">{{ error }}</div>
  
      <form v-if="mouvement" @submit.prevent="updateMouvement">
        <div>
          <label>ID:</label>
          <input type="text" v-model="mouvement.id" disabled />
        </div>
        <div>
          <label>Ingredient:</label>
          <input type="text" v-model="mouvement.ingredient.nom" />
        </div>
        <div>
          <label>Date Mouvement:</label>
          <input type="date" v-model="mouvement.dateMouvement" />
        </div>
        <div>
          <label>Entrée:</label>
          <input type="number" v-model="mouvement.entree" />
        </div>
        <div>
          <label>Sortie:</label>
          <input type="number" v-model="mouvement.sortie" />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'EditMouvement',
    setup() {
      const mouvement = ref(null);
      const error = ref(null);
      const isLoading = ref(false);
      const mouvementId = 1; // Remplacez ceci par l'ID du mouvement que vous souhaitez éditer
  
      const fetchMouvement = async () => {
        isLoading.value = true;
        try {
          const url = `http://m-esakafo-1.onrender.com/api/mouvements/${mouvementId}`;
          const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
  
          mouvement.value = response.data; // Assurez-vous que la structure correspond à ce que vous attendez
        } catch (err) {
          error.value = "Erreur lors du chargement du mouvement";
          console.error(err);
        } finally {
          isLoading.value = false;
        }
      };
  
      const updateMouvement = async () => {
        try {
          const url = `http://m-esakafo-1.onrender.com/api/mouvements/${mouvement.value.id}`;
          const response = await axios.put(url, mouvement.value, {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
  
          if (response.status === 200) {
            alert('Mouvement mis à jour avec succès!');
          }
        } catch (err) {
          error.value = "Erreur lors de la mise à jour du mouvement";
          console.error(err);
        }
      };
  
      onMounted(() => {
        fetchMouvement();
      });
  
      return {
        mouvement,
        error,
        isLoading,
        updateMouvement,
      };
    },
  };
  </script>