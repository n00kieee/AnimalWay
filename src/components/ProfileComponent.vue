<template>
  <v-sheet :height="200" width="100%">
    <v-img
      height="100%"
      cover
      src="@/assets/img/del.svg"
    >
      <v-container class="d-flex justify-start align-end pt-10">
        <v-card
          variant='flat'
          style="background-color: transparent;"
          max-width="444"
          class="d-flex justify-start align-center"
        >
          <v-card-item class="pa-0">
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
          </v-card-item>
        </v-card>
      </v-container>
    </v-img>
  </v-sheet>
</template>

<script setup>
import {computed} from "vue";
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
