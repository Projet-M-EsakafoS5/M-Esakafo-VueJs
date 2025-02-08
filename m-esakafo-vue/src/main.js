import { createApp, ref } from 'vue';
import App from './App.vue';
import Login from './components/Login.vue';
import { auth, onAuthStateChanged } from './firebase';
import './assets/main.css';

const isAuthenticated = ref(false);
onAuthStateChanged(auth, (user) => {
  isAuthenticated.value = !!user;
});
const app = createApp({
  setup() {
    return { isAuthenticated };
  },
  template: `<component :is="isAuthenticated ? App : Login" />`,
  components: { App, Login }
});

app.mount('#app');
