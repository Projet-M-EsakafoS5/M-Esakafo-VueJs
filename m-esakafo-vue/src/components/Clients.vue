<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Clients',
  setup() {
    const clients = ref([]);
    const error = ref(null);
    const isLoading = ref(false);

    // Fonction pour récupérer les commandes et les grouper par userId
    const fetchClients = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get('https://m-esakafo-1.onrender.com/api/commandes/list');
        if (response.status === 200) {
          const commandes = response.data.data;

          // Grouper les commandes par userId
          const clientsData = commandes.reduce((acc, commande) => {
            if (!acc[commande.userId]) {
              acc[commande.userId] = { userId: commande.userId, nombreCommandes: 0 };
            }
            acc[commande.userId].nombreCommandes += 1;
            return acc;
          }, {});

          // Convertir l'objet en tableau
          clients.value = Object.values(clientsData);
        } else {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
      } catch (err) {
        error.value = err.message || 'Une erreur est survenue';
      } finally {
        isLoading.value = false;
      }
    };

    // Appel de la fonction fetchClients au montage du composant
    onMounted(() => {
      fetchClients();
    });

    return {
      clients,
      error,
      isLoading,
    };
  },
};
</script>

<template>
  <div class="container">
    <h1>Liste des Clients et leurs Commandes</h1>
    <div v-if="isLoading" class="loading-message">Chargement...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else>
      <div v-for="client in clients" :key="client.userId" class="client-card">
        <div class="client-info">
          <h3>User ID: {{ client.userId }}</h3>
          <p>Nombre de commandes : <strong>{{ client.nombreCommandes }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  width: 90%;
  max-width: 1200px;
  padding: 20px;
}

h1 {
  color: #640142;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
  letter-spacing: 1px;
}

.loading-message,
.error-message {
  text-align: center;
  font-size: 1.5rem;
  color: #e74c3c;
  margin-top: 20px;
}

.client-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.client-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.client-info {
  text-align: center;
}

.client-info h3 {
  font-size: 1.6rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.client-info p {
  font-size: 1.2rem;
  color: #640142;
}

.client-info strong {
  color: #640142;
  font-weight: 600;
}
</style>
