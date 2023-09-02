<template>
  <ProfileComponent/>
  <v-tabs
    v-model="tab"
    bg-color="grey-darken-4"
    centered
    stacked
  >
    <v-tab value="user-info">Данные пользователя</v-tab>
    <v-tab value="user-ads">Ваши объявления</v-tab>
  </v-tabs>
  <v-card-text>
    <v-window v-model="tab">
      <v-window-item value="user-info">
        <UserData/>
      </v-window-item>
      <v-window-item value="user-ads">
        <UserAdsList/>
      </v-window-item>
    </v-window>
  </v-card-text>
</template>

<script setup>
import {onMounted, ref} from "vue";
import ProfileComponent from "@/components/ProfileComponent.vue";
import {useAdsStore} from "@/store/ads";
import UserAdsList from "@/components/ProfileTabs/UserAdsList.vue";
import {useAuthStore} from "@/store/user";
import UserData from "@/components/ProfileTabs/UserData.vue";

const tab = ref(null)
const store = useAdsStore()
const storeInfo = useAuthStore()

onMounted(async () => {
  await storeInfo.getUserInfo()
  await store.getUserAds()
})
</script>

<style scoped>

</style>
