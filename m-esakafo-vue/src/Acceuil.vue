<template>
    <div id="acceuil">
      <!-- Barre de menu gauche -->
      <div class="sidebar left">
        <!-- Logo dans la barre de menu -->
        <div class="logo">
          <img src="/img/1Logo.png" alt="Logo" />
        </div>
        <ul>
          <li><router-link to="/acceuil/dashboard">Dashboard</router-link></li>
          <li><router-link to="/acceuil/commande">Commandes</router-link></li>
          <li><router-link to="/acceuil/mouvement">Mouvement</router-link></li>
          <li><router-link to="/acceuil/plats">Plats / Recette</router-link></li>
        </ul>
      </div>
  
      <!-- Contenu principal -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import 'font-awesome/css/font-awesome.css';

  export default {
    name: 'Acceuil',
  };
  </script>
  
  <style scoped>
  #acceuil {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 250px;
    background-color: #640142;
    height: 100vh;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    color: white;
    padding: 20px;
  }
  
  .sidebar .logo {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .sidebar .logo img {
    width: 80px; /* Ajuste la taille du logo selon tes préférences */
    height: auto;
  }
  
  .sidebar.left {
    position: fixed;
    left: 0;
    top: 0;
  }
  
  .sidebar.right {
    position: fixed;
    right: 0;
    top: 0;
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar ul li {
    margin-bottom: 15px;
  }
  
  .sidebar ul li a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    transition: color 0.3s;
    display: flex;
    align-items: center;
  }
  
  .sidebar ul li a i {
    margin-right: 10px; /* Espace entre l'icône et le texte */
  }
  
  .sidebar ul li a:hover {
    color: #ff9700;
    background-color: #640142;
  }
  
  .content {
    flex-grow: 1;
    margin-left: 250px; /* Pour éviter que le contenu passe sous la sidebar gauche */
    margin-right: 250px; /* Pour éviter que le contenu passe sous la sidebar droite */
    padding: 20px;
  }
  </style>
  