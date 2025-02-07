<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Commande',
  setup() {
    const commandes = ref([]);
    const commandesEnCours = ref([]);
    const commandesTerminees = ref([]);
    const error = ref(null);
    const isLoading = ref(false);

    // Récupération de toutes les commandes
    const fetchCommandes = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/commandes/list`, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        commandes.value = response.data.data;
      } catch (err) {
        error.value = "Erreur lors du chargement des commandes";
      } finally {
        isLoading.value = false;
      }
    };

    // Récupération des commandes en attente
    const fetchCommandesEnCours = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/commandes/list`);
      commandesEnCours.value = response.data.data.filter(commande => commande.statut === 0);
    } catch (err) {
      console.error("Erreur commandes en cours", err);
    }
  };


    // Récupération des commandes terminées
    const fetchCommandesTerminees = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/commandes/status/1`);
        commandesTerminees.value = response.data.data.commandes;
      } catch (err) {
        console.error("Erreur commandes terminées", err);
      }
    };

    onMounted(() => {
      fetchCommandes();
      fetchCommandesEnCours();
      fetchCommandesTerminees();
    });

    return {
      commandes,
      commandesEnCours,
      commandesTerminees,
      error,
      isLoading,
    };
  },
};
</script>

<template>
  <div class="container">
    <h1>Liste des Commandes</h1>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="isLoading" class="loading">Chargement...</div>

    <!-- Tableau des commandes -->
    <table v-if="commandes.length">
      <thead>
        <tr>
          <th>N° Ticket</th>
          <th>Date</th>
          <th>Statut</th>
          <th>Plat</th>
          <th>Quantité</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="commande in commandes" :key="commande.id">
          <td>{{ commande.numero_ticket }}</td>
          <td>{{ new Date(commande.date_commande).toLocaleString() }}</td>
          <td>{{ commande.statut === 1 ? "En cours" : "Terminé" }}</td>
          <td>{{ commande.plat.nom }}</td>
          <td>{{ commande.quantite }}</td>
          <td>{{ commande.plat.prix }} €</td>
        </tr>
      </tbody>
    </table>

    <!-- Commandes en cours -->
    <h1>Commandes en cours</h1>
    <div class="commandes-container">
      <div class="commande-card" v-for="commande in commandesEnCours" :key="commande.id">
        <h3>{{ commande.plat.nom }}</h3>
        <p><b>Quantité:</b> {{ commande.quantite }}</p>
        <p><b>Prix:</b> {{ commande.plat.prix }} €</p>
        <img :src="`/src/img/${commande.plat.sprite}`" alt="Plat" />
      </div>
    </div>

    <!-- Commandes terminées -->
    <h1>Commandes Terminées</h1>
    <div class="commandes-container">
      <div class="commande-card" v-for="commande in commandesTerminees" :key="commande.id">
        <h3>{{ commande.plat.nom }}</h3>
        <p><b>Quantité:</b> {{ commande.quantite }}</p>
        <p><b>Prix:</b> {{ commande.plat.prix }} €</p>
        <img :src="`/src/img/${commande.plat.sprite}`" alt="Plat" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

h1, h2 {
  color: #6a4c9c;
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}

.loading {
  text-align: center;
  font-weight: bold;
}

/* TABLEAU */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th, table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
  color: #6a4c9c;
}

table th {
  background-color: #6a4c9c;
  color: white;
}

table tr:nth-child(even) {
  background-color: #f4f4f4;
  color: #6a4c9c;
}

table tr:hover {
  background-color: #e3d5f7;
  color: #6a4c9c;
}

/* CARDS */
.commandes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.commande-card {
  background: white;
  padding: 15px;
  color: #6a4c9c;

  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 220px;
  text-align: center;
  border: 2px solid #6a4c9c;
}

.commande-card img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
