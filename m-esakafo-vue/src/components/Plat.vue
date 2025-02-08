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
  <h1><b>Voici la liste des plats</b></h1>
  <div class="plats-container">
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
            <img v-bind:src="`src/img/${plat.sprite}`" width="50" height="50" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h1{
  color:#6a4c9c;


}
/* Assurez-vous que le body et html prennent toute la hauteur */
html, body {
  height: 100%;
  height: 100%;
  width: 100%;
  padding: 0;
}

/* Assurez-vous que le conteneur principal occupe toute la hauteur de la page */
.plats-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* Prend toute la hauteur disponible */
  width: 100%; /* Prend toute la hauteur disponible */
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
}

/* Rendre la table plus fluide et pleine hauteur */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  height: 100%; /* Assurez-vous que la table prend la hauteur restante */
}

table th, table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
  color:#6a4c9c;
  border-radius: 5px;
}

table th {
  background-color: #6a4c9c; /* Violet */
  color: white;
  font-weight: bold;
}

table tr:nth-child(even) {
  background-color: #f4f4f4;
}

table tr:hover {
  background-color: #f2e3f7; /* Violet très clair au survol */
}

img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.error, .loading {
  text-align: center;
  margin-bottom: 20px;
}

</style>
