<template>
  <v-sheet :height="200" width="100%">
    <v-img
      height="100%"
      cover
      src="@/assets/img/del.svg"
    >
      <v-card
        variant='flat'
        style="background-color: transparent;"
        max-width="444"
        class="d-flex justify-start align-start"
      >
        <v-card-item>
          <v-list-item>
            <template v-slot:prepend>
              <v-avatar color="red" size="80">
                <span class="text-h3">{{ getInfo?.displayName[0] }}</span>
              </v-avatar>
            </template>
            <v-list-item-title class="text-h5 font-weight-medium pb-2">{{ getInfo?.displayName }}</v-list-item-title>

            <v-tooltip text="Электронный адрес подтвержден!">
              <template v-slot:activator="{ props }">
                <v-list-item-subtitle class="text-black pb-2">{{ getInfo?.email }}
                  <v-icon v-bind="props" v-if="getInfo?.emailVerified" color="green" icon="fa fa-circle-check">
                  </v-icon>
                </v-list-item-subtitle>
              </template>
            </v-tooltip>

            <v-list-item-subtitle class="text-black pb-2">Зарегистрирован
              {{ dateNow(new Date(`${getInfo?.creationTime}`)) }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              class="ma-2"
              dark
              fab
              bottom
              color="blue darken-7"
              size="large"
              target="_blank"
              icon="fab fa-vk"
            ></v-btn>

            <v-btn
              class="ma-2"
              dark
              fab
              bottom
              color="blue darken-7"
              size="large"
              target="_blank"
              icon="fab fa-telegram"
            ></v-btn>

            <v-btn
              class="ma-2"
              dark
              fab
              bottom
              color="pink-darken-1"
              size="large"
              target="_blank"
              icon="fab fa-instagram"
            ></v-btn>
          </v-card-actions>
        </v-card-item>
      </v-card>
    </v-img>
  </v-sheet>
</template>

<script setup>
import {computed, onMounted} from "vue";
import {useAuthStore} from "@/store/user";

const dateNow = computed(() => (date = new Date(), locale = `ru-RU`) => {
  return date.toLocaleDateString(locale, {month: 'long', day: "numeric", year: "numeric"})
})

const store = useAuthStore();

const getInfo = computed(() => {
  return store;
})
</script>

<style scoped>

</style>
