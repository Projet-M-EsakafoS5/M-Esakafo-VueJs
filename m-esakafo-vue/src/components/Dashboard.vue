<template>
    <div class="dashboard">
      <h1>Tableau de Bord des Ventes</h1>

      <h2>Nombre de Commandes par Mois</h2>
      <div class="chart-container">
        <canvas id="commandesChart"></canvas>
      </div>
  
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="isLoading" class="loading">Chargement...</div>
  
      <div v-if="resumeGlobal" class="stats-container">
        <div class="stat-card">
          <h2>Chiffre d'affaire total</h2>
          <p>{{ resumeGlobal.chiffre_affaires_total || 'Données indisponibles' }}</p>
        </div>
        <div class="stat-card">
          <h2>Nombre Total de Plats Vendus</h2>
          <p>{{ resumeGlobal.nombre_total_plats_vendus || 'Données indisponibles' }}</p>
        </div>
        <div class="stat-card">
          <h2>Nombre de Plats Différents</h2>
          <p>{{ resumeGlobal.nombre_plats_differents || 'Données indisponibles' }}</p>
        </div>
        <div class="stat-card">
          <h2>Moyenne de Vente par Plat</h2>
          <p>{{ resumeGlobal.moyenne_vente_par_plat }} €</p>
        </div>
      </div>
  
      
    </div>
  </template>
<script>
import { ref, onMounted } from "vue";
import axios from 'axios';

export default {
  name: "DashboardVentes",
  setup() {
    const resumeGlobal = ref(null);
    const isLoading = ref(false);
    const error = ref(null);
    const commandes = ref([]);
    const commandesParMois = ref({});

    // Fonction pour récupérer les ventes totales (chiffre d'affaires, plats vendus...)
    const fetchVentesTotales = async () => {
      isLoading.value = true;
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/commandes/ventes-totales`);
        const data = await response.json();
        console.log("Données récupérées : ", data);

        if (!data.data) {
          throw new Error("Les données sont manquantes dans la réponse.");
        }

        resumeGlobal.value = data.data.resume_global; // Vérifiez que les clés existent dans `data`
      } catch (err) {
        console.error("Erreur : ", err);
        error.value = "Erreur lors du chargement des statistiques.";
      } finally {
        isLoading.value = false;
      }
    };

    // Fonction pour récupérer les commandes et préparer les données du graphique
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

        // Préparer les données pour le graphique
        const commandesParDate = {};
        commandes.value.forEach((commande) => {
          const dateStr = commande.date_commande;
          const date = new Date(dateStr);

          if (isNaN(date.getTime())) {
            console.error("Date invalide : ", dateStr);
            return;
          }

          const mois = date.toISOString().slice(0, 7);
          if (!commandesParDate[mois]) {
            commandesParDate[mois] = 0;
          }
          commandesParDate[mois] += 1;
        });

        commandesParMois.value = {
          labels: Object.keys(commandesParDate),
          datasets: [
            {
              label: "Nombre de Commandes par Mois",
              data: Object.values(commandesParDate),
              backgroundColor: "rgba(106, 76, 156, 0.7)",
              borderColor: "#6a4c9c",
              borderWidth: 1,
            },
          ],
        };

        drawChart(commandesParMois.value);

      } catch (err) {
        error.value = "Erreur lors du chargement des commandes";
        console.error("Erreur : ", err);
      } finally {
        isLoading.value = false;
      }
    };

    const drawChart = (data) => {
      const ctx = document.getElementById("commandesChart").getContext("2d");
      if (window.chartInstance) {
        window.chartInstance.destroy();
      }
      window.chartInstance = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    };

    onMounted(() => {
      fetchVentesTotales();
      fetchCommandes();
    });

    return { resumeGlobal, commandesParMois, isLoading, error };
  },
};
</script>
<style scoped>
.dashboard {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #6a4c9c;
}

.stats-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.stat-card {
  background: white;
  padding: 15px;
  color: #6a4c9c;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 220px;
  text-align: center;
  border: 2px solid #6a4c9c;
}

.chart-container {
  width: 100%;
  max-width: 800px;
  margin: auto;
  margin-top: 20px;
}
</style>  