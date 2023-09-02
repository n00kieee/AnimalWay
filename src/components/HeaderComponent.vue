<template>
  <div>
    <v-navigation-drawer
      absolute temporary
      v-model="drawer" class="hidden-md-and-up"
      theme="dark"
    >
      <v-list nav>
        <v-list-item flat :to="'/add-ads'" v-if="store.isLoggedIn">
          <v-icon left>fas fa-plus</v-icon>
          Создать обьявление
        </v-list-item>
        <v-divider v-if="store.isLoggedIn"></v-divider>
        <v-list-item :to="'/'">Главная</v-list-item>
        <v-list-item :to="'/ads'">Объявления</v-list-item>
        <v-list-item v-if="store.isLoggedIn" :to="'/profile'">Профиль</v-list-item>
        <v-list-item v-if="!store.isLoggedIn" :to="'/sign-in'">Войти</v-list-item>
        <v-list-item v-if="!store.isLoggedIn" :to="'/sign-up'">Регистрация</v-list-item>
        <v-divider v-if="store.isLoggedIn"></v-divider>
        <v-list-item @click.prevent="logout" v-if="store.isLoggedIn">
          <v-icon left>fas fa-right-from-bracket</v-icon>
          Выйти
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="grey-darken-4">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="'Animal Way'"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :to="'/add-ads'" v-if="store.isLoggedIn">
          <v-icon left>fas fa-plus</v-icon>
          Создать обьявление
        </v-btn>
        <v-divider vertical v-if="store.isLoggedIn"></v-divider>
        <v-btn flat :to="'/'">
          Главная
        </v-btn>
        <v-btn flat :to="'/ads'">
          Объявления
        </v-btn>
        <v-btn flat :to="'/profile'" v-if="store.isLoggedIn">
          Профиль
        </v-btn>
        <v-btn flat :to="'/sign-in'" v-if="!store.isLoggedIn">
          Войти
        </v-btn>
        <v-btn flat :to="'/sign-up'" v-if="!store.isLoggedIn">
          Регистрация
        </v-btn>
        <v-divider vertical v-if="store.isLoggedIn"></v-divider>
        <v-btn flat @click.prevent="logout" v-if="store.isLoggedIn">
          <v-icon left>fas fa-right-from-bracket</v-icon>
          Выйти
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useAuthStore} from "@/store/user";

const drawer = ref(false)

const store = useAuthStore()

const logout = () => {
  store.logOut()
}
</script>
