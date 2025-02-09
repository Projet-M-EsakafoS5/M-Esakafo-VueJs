<template>
  <div id="app">
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
