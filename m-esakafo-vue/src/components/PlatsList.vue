<template>
  <div class="plats-container">
    <h2>Liste des Plats</h2>
    <div v-if="loading" class="loading">
      Chargement...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="plats-grid">
      <div v-for="plat in plats" :key="plat.id" class="plat-card">
        <div class="plat-info">
          <h3>{{ plat.nom }}</h3>
          <p v-if="plat.tempsCuisson" class="temps-cuisson">
            Temps de cuisson: {{ plat.tempsCuisson }}
          </p>
          <p class="prix">{{ plat.prix }} Ar</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PlatsList',
  data() {
    return {
      plats: [],
      loading: true,
      error: null
    }
  },
  created() {
    this.fetchPlatsList()
  },
  methods: {
    fetchPlatsList() {
      this.loading = true
      this.error = null

      // Utiliser l'URL de base depuis le fichier .env
      const baseURL = import.meta.env.VITE_API_URL || 'https://m-esakafo-1.onrender.com'
      
      axios.get(`${baseURL}api/plats`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        this.plats = response.data
        this.loading = false
      })
      .catch(error => {
        this.error = 'Erreur lors du chargement des plats'
        console.error('Erreur:', error)
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.plats-container {
  padding: 20px;
}

.plats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.plat-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.plat-card:hover {
  transform: translateY(-5px);
}

.plat-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.plat-info {
  padding: 15px;
}

.plat-info h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.temps-cuisson {
  color: #666;
  font-size: 0.9em;
  margin: 5px 0;
}

.prix {
  color: #42b983;
  font-weight: bold;
  font-size: 1.2em;
  margin: 10px 0 0 0;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #dc3545;
  text-align: center;
  padding: 20px;
}
</style>
