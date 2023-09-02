<template>
  <v-app>
    <HeaderComponent/>
    <router-view/>
    <FooterComponent/>
  </v-app>
</template>

<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import {useAuthStore} from "@/store/user";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const store = useAuthStore()

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    store.isLoggedIn = true;
  } else {
    store.isLoggedIn = false;
  }
});
</script>
