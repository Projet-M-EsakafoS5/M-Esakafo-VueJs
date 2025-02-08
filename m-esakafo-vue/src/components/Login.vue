<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword, auth } from '../firebase';

const email = ref("admin@gmail.com");
const password = ref("9jiYq3GOu0fTTayeV3B9pCnX4To1");
const errorMessage = ref("");

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch (error) {
    errorMessage.value = "Erreur de connexion : " + error.message;
  }
};
</script>

<template>
  <div>
    <h1>Connexion</h1>
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Mot de passe" />
    <button @click="login">Se connecter</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
