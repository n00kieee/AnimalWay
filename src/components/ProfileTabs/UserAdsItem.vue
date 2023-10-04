<template>
  <v-card
    row
    class="ma-6"
    max-width="400"
    rounded="xl"
  >
    <router-link class="text-decoration-none text-black" :to="{name: 'add-details', params: {id: userAds?.id}}">
      <v-skeleton-loader :loading="loading" width="300" type="image">
        <v-img
          v-if="!props.userAds?.image"
          class="align-end text-white"
          height="200"
          width="300"
          src="/src/assets/img/placeholder.png"
          cover
        >
        </v-img>
        <v-img
          v-else
          class="align-end text-white"
          :class="isRemovedClass"
          width="300"
          height="200"
          :src="props.userAds?.image[0]"
          cover
        >
        </v-img>
      </v-skeleton-loader>
      <v-card-title class="d-flex justify-center pt-4">
        {{ props.userAds.typeAd }}
      </v-card-title>
      <v-card-text>
        <div>Животное: {{ props.userAds.animal }}</div>
        <div>Город: {{ props.userAds.city }}</div>
        <div>Возраст: {{ props.userAds.age }}</div>
        <div>Пол: {{ props.userAds.gender }}</div>
      </v-card-text>
    </router-link>
  </v-card>
</template>

<script setup>
import {computed, ref} from "vue";
import {VSkeletonLoader} from 'vuetify/labs/VSkeletonLoader'

const props = defineProps({
  userAds: {
    type: Object,
    required: true
  }
});

const isRemoved = computed(() => {
  return props.userAds?.typeAd
})

const isRemovedClass = computed(() => {
  if (isRemoved.value === "Снято") {
    return {
      'is-removed-user': isRemoved.value,
    }
  }
})

const loading = ref(true)

const load = (setTimeout(() => {
  loading.value = false
}, 1000))
</script>

<style scoped>
.is-removed-user {
  position: relative;
  overflow: hidden;
}

.is-removed-user:after {
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
