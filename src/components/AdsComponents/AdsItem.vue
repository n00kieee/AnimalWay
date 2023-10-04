<template>
  <v-card
    v-if="allAds !== ''"
    class="ma-6"
    max-width="400"
    rounded="xl"
  >

    <router-link class="text-decoration-none text-black" :to="{name: 'add-details', params: {id: allAds?.id}}">
      <v-skeleton-loader :loading="loading" width="300" type="image">
        <v-img
          v-if="!allAds?.image"
          class="align-end text-white"
          width="300"
          height="200"
          src="@/assets/img/placeholder.png"
          cover
        >
        </v-img>
        <v-img
          v-else
          class="align-end text-white"
          :class="isRemovedClass"
          height="200"
          width="300"
          :src="allAds?.image[0]"
          cover
        >
        </v-img>
      </v-skeleton-loader>
      <v-card-title class="d-flex justify-center pt-4">
        {{ allAds?.typeAd }}
      </v-card-title>
      <v-card-text>
        <div>Животное: {{ allAds?.animal }}</div>
        <div>Город: {{ allAds?.city }}</div>
        <div>Возраст: {{ allAds?.age }}</div>
        <div>Пол: {{ allAds?.gender }}</div>
      </v-card-text>
    </router-link>

  </v-card>
</template>

<script setup>
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {VSkeletonLoader} from 'vuetify/labs/VSkeletonLoader'

const router = useRouter();

const props = defineProps({
  allAds: {
    type: Object,
    required: true
  },
});

const loading = ref(true)

const load = (setTimeout(() => {
  loading.value = false
}, 1000))

const isRemoved = computed(() => {
  return props.allAds?.typeAd
})

const isRemovedClass = computed(() => ({
  'is-removed': isRemoved.value === "Снято",
}));
</script>

<style scoped>
.is-removed {
  position: relative;
  overflow: hidden;
}

.is-removed:after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("@/assets/img/removed.png"), linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 100%);
  background-size: 300px 200px;
}
</style>
