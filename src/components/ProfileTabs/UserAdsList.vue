<template>
  <v-container style="max-width: 85%" class="d-flex justify-start flex-wrap mt-10 mb-10">
    <UserAdsItem v-for="ad in userAds" :user-ads="ad"/>
  </v-container>
</template>

<script setup>
import {computed} from "vue";
import {useAdsStore} from "@/store/ads";
import UserAdsItem from "@/components/ProfileTabs/UserAdsItem.vue";

const store = useAdsStore()

const userAds = computed(() => {
  return store.adsList
});
</script>

<style scoped>

</style>
