<template>
  <div class="background">
    <div class="form-container">
      <h1><b>Connexion</b></h1>
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Mot de passe" />
      <button @click="handleSignIn">Se connecter</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>
<script>  
import { ref } from 'vue';  
import { useRouter } from 'vue-router';   
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword } from "firebase/auth";  

export default {  
  setup() {  
    const email = ref("admin@gmail.com");  // Adresse email  
    const password = ref("123456");  // Mot de passe  
    const errorMessage = ref("");  // Message d'erreur  
    const router = useRouter();   // Instance du router  

    const handleSignIn = async () => {  
      try {  

        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);  
        console.log("Utilisateur connecté :", userCredential);  


        if (userCredential.user.uid === 'ejQ0HUOcOQdrETBy6k3ZmhI0tOu1') {  
          router.push('/acceuil/dashboard');  
        } else {  
          router.push('/');  
        }  

      } catch (error) {  
        errorMessage.value = error.message; 
        console.error("Erreur lors de la connexion :", error);  
      }  
    };  

    return {  
      email,  
      password,  
      handleSignIn,  
      errorMessage   
    };  
  },  
};  
</script>
<style scoped>

.background {
  background-image: url('/img/index.png'); 
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 40px;  /* Augmenter le padding pour plus d'espace à l'intérieur */
  margin-top: 210px;  /* Réduire la marge pour centrer plus haut sur la page */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;  /* Augmenter la largeur du formulaire */
  text-align: center;
}

input {
  width: 100%;
  padding: 15px;  /* Augmenter la taille des champs de texte */
  margin: 15px 0;  /* Plus d'espace entre les champs */
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 15px;  /* Augmenter la taille du bouton */
  background-color: #f19203;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #FF9700;
}

p {
  color: red;
  font-size: 16px;  /* Augmenter la taille du texte d'erreur */
}

</style>