<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Mouvements',
  setup() {
    const mouvements = ref([]);  // Tableau pour stocker les mouvements extraits
    const error = ref(null);  // Pour gérer les erreurs
    const isLoading = ref(false);  // Pour gérer l'état de chargement

    const fetchMouvements = async () => {
      isLoading.value = true;
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/mouvements`;  
    
    // Affichage de l'URL dans les logs  
    console.log('Fetching data from:', url);  
    
    const response = await axios.get(url, { 
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response.status !== 200) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        // Assigner les données récupérées à la variable `mouvements`
        mouvements.value = response.data.data;

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
      fetchMouvements();
    });

    return {
      mouvements,
      error,
      isLoading,
    };
  },
};


</script>

<template>  
    <div>  
      <h2>Tableau d'exemple</h2>  
      <table>  
        <thead>  
          <tr>  
            <th>ID</th>  
            <th>Ingredient</th>  
            <th>Date mouvement</th>  
            <th>Entree</th>  
            <th>Sortie</th>  
          </tr>  
        </thead>  
        <tbody>  
          <tr v-for="mouvement in mouvements" :key="mouvement.id">

            <td>{{ mouvement.id }}</td>  
            <td>{{ mouvement.ingredient }}</td>  
            <td>{{ mouvement.date }}</td>  
            <td>{{ mouvement.entre || 0 }}</td>  
            <td>{{ mouvement.sortie || 0 }}</td>  
          </tr>  
        </tbody>  
      </table>  
    </div>  
  </template>  
  
  
  <style scoped>  
  table {  
    width: 100%;  
    border-collapse: collapse;  
  }  
  
  th, td {  
    border: 1px solid #ddd;  
    padding: 8px;  
    text-align: left;  
  }  
  
  th {  
    background-color: #f2f2f2;  
  }  
  </style>