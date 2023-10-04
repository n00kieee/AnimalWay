<template>
  <yandex-map
    :settings="settings"
    :coordinates="coords"
    :controls="[]"
    :zoom="15"
  >
    <YandexMarker
      :coordinates="coords"
      :marker-id="getAddress"
    >
    </YandexMarker>
  </yandex-map>
</template>

<script setup>
import {YandexMap, loadYmap, YandexMarker} from 'vue-yandex-maps'
import {settings} from "@/config/YandexMap/api";
import {computed, onMounted, ref} from "vue";
import {useAdsStore} from "@/store/ads";


const store = useAdsStore();

const coords = ref([null]);

const getAddress = computed(() => {
  return store.adDetails.address;
})

onMounted(async () => {
  await loadYmap({
    debug: true
  });
  await ymaps.geocode(getAddress.value).then((res) => {
    const userGeoObject = res.geoObjects.get(0)
    coords.value = userGeoObject.geometry.getCoordinates()
  }).catch((error) => {
    console.log(error)
  })
})
// const onClick = (e) => (coords.value = e.get('coords'));
</script>

<style>

</style>
