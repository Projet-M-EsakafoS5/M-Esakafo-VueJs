<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Mouvements',
  setup() {
    const mouvements = ref([]); 
    const stockEntree = ref({}); 
    const error = ref(null);
    const isLoading = ref(false);

    const fetchMouvements = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get('https://m-esakafo-1.onrender.com/api/mouvements/mouvement_ingredient');
        if (response.status === 200) {
          mouvements.value = response.data;
        } else {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
      } catch (err) {
        error.value = err.message || 'Une erreur est survenue';
      } finally {
        isLoading.value = false;
      }
    };

    // Fonction pour enregistrer une nouvelle entrée de stock
    const ajouterEntreeStock = async (id) => {
      if (!stockEntree.value[id] || stockEntree.value[id] <= 0) {
        alert("Veuillez entrer une quantité valide");
        return;
      }
      try {
        const dateAujourdHui = new Date();
        const dateFormatee = dateAujourdHui.toLocaleDateString('fr-CA'); 
        await axios.post('https://m-esakafo-1.onrender.com/api/mouvements', {
          ingredientId: id,
          entree: stockEntree.value[id],
          dateMouvement: dateFormatee
        });
        alert("Stock mis à jour avec succès");
        stockEntree.value[id] = 0; 
        fetchMouvements(); 
      } catch (err) {
        alert("Erreur lors de l'ajout du stock");
      }

    };

    onMounted(() => {
      fetchMouvements();
    });

    return {
      mouvements,
      stockEntree,
      error,
      isLoading,
      ajouterEntreeStock,
    };
  },
};

</script>

<template>
  <div>
    <h1>Gestion des Mouvements des ingrédients</h1>
    <div v-if="isLoading">Chargement...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="mouvement in mouvements" :key="mouvement.id" class="ingredient-card">
        <img :src="`/img/${mouvement.sprite}`" :alt="mouvement.nom" class="ingredient-image" />
        <div class="ingredient-info">
          <h3>{{ mouvement.nom }}</h3>
          <p>Entrées: {{ mouvement.sommeEntre }}</p>
          <p>Sorties: {{ mouvement.sommeSortie }}</p>
          <p>Stock restant: {{ mouvement.resteEnStock }}</p>
          <input type="number" v-model="stockEntree[mouvement.id]" placeholder="Nouvelle entrée" min="1" />
          <button @click="ajouterEntreeStock(mouvement.id)">Ajouter</button>
        </div>
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
.ingredient-card {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.ingredient-card:hover {
  transform: scale(1.02);
}

.ingredient-image {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
  border: 3px solid #ddd;
}

.ingredient-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

h3 {
  color: #333;
  font-size: 22px;
  margin-bottom: 10px;
}

p {
  color: #555;
  font-size: 16px;
  margin: 3px 0;
}

input {
  margin-top: 8px;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button {
  margin-top: 10px;
  background: #640142;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

button:hover {
  background: #8a024a;
}

</style>
