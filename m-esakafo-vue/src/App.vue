<template>
  <div id="app">
    <!-- <div class="sidebar">
      <ul>
        <li><router-link to="/ingredient">Ingredients</router-link></li>
        <li><router-link to="/mouvement">Mouvement</router-link></li>
        <li><router-link to="/commandes">Commandes</router-link></li>
      </ul>
    </div> -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* #app {
  display: flex;
} */

.sidebar {
  width: 400px;
  background-color: #3d0228;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 10px;
}

.content {
  flex-grow: 1;
  /* padding: 20px; */
}
</style>
