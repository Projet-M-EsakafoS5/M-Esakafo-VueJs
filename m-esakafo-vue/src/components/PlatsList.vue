<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Plats',
  setup() {
    const plats = ref([]);  // Tableau pour stocker les plats extraits
    const error = ref(null);  // Pour gérer les erreurs
    const isLoading = ref(false);  // Pour gérer l'état de chargement

    const fetchPlats = async () => {
      isLoading.value = true;
      try {
        console.log('URL API:', import.meta.env.VITE_API_URL);

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

        // Affichage des données brutes reçues
        console.log('Réponse brute:', response.data);

        // On assigne directement la réponse JSON au tableau `plats`
        plats.value = response.data.data;

        isLoading.value = false;

      } catch (err) {
        if (err.response && err.response.status === 429) {
          const retryAfter = err.response.headers['retry-after'];
          error.value = `Trop de requêtes. Veuillez attendre ${retryAfter ? retryAfter : 'un peu'} avant de réessayer.`;
        } else {
          error.value = err.message || 'Une erreur est survenue';
        }
        console.error('Erreur complète:', err);
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchPlats();
    });

    return {
      plats,
      error,
      isLoading,
    };
  },
};
</script>

<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="isLoading" class="loading">Chargement...</div>
    <table v-else>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
          <th>Temps de Cuisson</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(plat, index) in plats" :key="plat.id">
          <td>{{ plat.nom }}</td>
          <td>{{ plat.prix }}</td>
          <td>{{ plat.tempsCuisson }}</td>
          <td>
            <img v-bind:src="`/path/to/images/${plat.sprite}`" :alt="plat.nom" width="50" height="50" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
.loading {
  font-size: 1.5em;
  color: green;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table th, table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
