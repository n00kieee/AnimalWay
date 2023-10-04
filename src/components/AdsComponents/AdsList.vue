<template>
  <h1 class="text-center mt-3">{{ $route.meta.title }}</h1>
  <v-container class="d-flex justify-center flex-column">
    <v-container style="max-width: 85%" class="d-flex flex-wrap mt-10 mb-10">
      <AdsItem v-for="ad in getAdsForPage" :allAds="ad"/>
      <v-container class="mt-3 mb-10">
        <v-card rounded="xl" style="max-width: 95%">
          <v-pagination
            v-if="getAdsForPage.length !== 0"
            v-model="page"
            :length="pageLength"
            rounded="circle"
          ></v-pagination>
        </v-card>
      </v-container>
    </v-container>

  </v-container>
</template>

<script setup>
import {useAdsStore} from "@/store/ads";
import {computed, ref} from "vue";
import AdsItem from "@/components/AdsComponents/AdsItem.vue";

const store = useAdsStore()

const page = ref(1);
const itemsPerPage = ref(8)

const pageLength = computed(() => {
  return Math.ceil(Object.values(store.adsList).length / itemsPerPage.value)
})

const getAdsForPage = computed(() => {
  return Object.values(store.adsList).slice((page.value - 1) * itemsPerPage.value, page.value * itemsPerPage.value)
})
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 32px;
}
</style>
