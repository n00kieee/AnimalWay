<template>
  <AdsList/>
</template>

<script setup>
import AdsList from "@/components/AdsComponents/AdsList.vue";
import {useAdsStore} from "@/store/ads";
import {onMounted} from "vue";

const store = useAdsStore()

onMounted(async () => {
  await store.getAllAds()
})
</script>

<style scoped>

</style>
