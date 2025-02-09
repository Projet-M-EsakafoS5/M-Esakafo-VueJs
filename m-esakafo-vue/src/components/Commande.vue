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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/commandes/status/3`);
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
      <div v-if="commandesEnCours.length === 0" class="no-commandes">Pas de commande en cours</div>
      <div class="commande-card" v-for="commande in commandesEnCours" :key="commande.id">
        <img :src="`/img/${commande.plat.sprite}`" alt="Plat" />
        <p class="nom">{{ commande.plat.nom }}</p>
        <p class="qtt"><b>Quantité:</b> {{ commande.quantite }}</p>
        <p class="prix"><b>Prix:</b> {{ commande.plat.prix }} €</p>
      </div>
    </div>

    <!-- Commandes terminées -->
    <h1>Commandes Terminées</h1>
    <div class="commandes-container">
      <div v-if="commandesTerminees.length === 0" class="no-commandes">Aucune de commande terminés pour l'instant</div>
      <div class="commande-card" v-for="commande in commandesTerminees" :key="commande.id">
        <img :src="`/img/${commande.plat.sprite}`" alt="Plat" />
        <p class="nom">{{ commande.plat.nom }}</p>
        <p class="qtt"><b>Quantité:</b> {{ commande.quantite }}</p>
        <p class="prix"><b>Prix:</b> {{ commande.plat.prix }} MGA</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-commandes {
  text-align: center;
  font-size: 18px;
  color: #ff8200;
  font-weight: bold;
  margin-top: 20px;
}

.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

h1, h2 {
  font-weight: bold;
  color: #640142;
}

.error {
  color: red;
  text-align: center;
}

.loading {
  text-align: center;
  font-weight: bold;
}



/* CARDS */
.commandes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
  height: 250px;
}

.commande-card {
  background: white;
    padding: 15px;
    /* color: #640142; */
    background-color: #640142;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    height: 250px;
    width: 200px;
    border: 2px solid #640142;
    align-items: center;
    text-align: center;
  }
  
  .commande-card img {
    width: 180px;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
    margin:-6px
  }

.nom{
    font-size: 15px;
    font-weight: bold;
    color: #ffffff;
  }

.qtt{
  color: #ffffff;
}

.prix{
  font-weight: bold;
  color: #f9f0e5;
}

</style>
