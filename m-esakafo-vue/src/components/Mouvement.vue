<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Mouvements',
  setup() {
    const mouvements = ref([]);  // Tableau pour stocker les mouvements extraits
    const quantities = ref({});   // Objet pour stocker la quantité restante par ingrédient
    const error = ref(null);      // Pour gérer les erreurs
    const isLoading = ref(false); // Pour gérer l'état de chargement

    // Récupérer les mouvements et calculer les quantités restantes
    const fetchMouvements = async () => {
      isLoading.value = true;
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/mouvements`;  
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

        mouvements.value = response.data.data;
        calculateQuantities();  // Calculer les quantités restantes
        isLoading.value = false;
      } catch (err) {
        error.value = err.message || 'Une erreur est survenue';
        isLoading.value = false;
      }
    };

    // Calculer la quantité restante par ingrédient
    const calculateQuantities = () => {
      const result = {};
      mouvements.value.forEach(mouvement => {
        if (mouvement.ingredient) {
          if (!result[mouvement.ingredient]) {
            result[mouvement.ingredient] = 0;
          }
          if (mouvement.sortie) {
            result[mouvement.ingredient] -= mouvement.sortie;
          }
          if (mouvement.entre) {
            result[mouvement.ingredient] += mouvement.entre;
          }
        }
      });
      quantities.value = result;
    };

    // Modifier la quantité d'un ingrédient
    const updateQuantity = (ingredient, newQuantity) => {
      quantities.value[ingredient] = newQuantity;
    };

    onMounted(() => {
      fetchMouvements();
    });

    return {
      mouvements,
      quantities,
      error,
      isLoading,
      updateQuantity,
    };
  },
};
</script>

<template>
  <div>
    <h2>Tableau des Mouvements</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ingredient</th>
          <th>Date mouvement</th>
          <th>Entree</th>
          <th>Sortie</th>
          <th>Quantité restante</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mouvement in mouvements" :key="mouvement.id">
          <td>{{ mouvement.id }}</td>
          <td>{{ mouvement.ingredient }}</td>
          <td>{{ mouvement.date }}</td>
          <td>{{ mouvement.entre || 0 }}</td>
          <td>{{ mouvement.sortie || 0 }}</td>
          <td>
            <div>
              <img :src="`/path/to/sprites/${mouvement.ingredient}.png`" alt="Sprite" />
              <input type="number" v-model="quantities[mouvement.ingredient]" 
                     @change="updateQuantity(mouvement.ingredient, quantities[mouvement.ingredient])" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
