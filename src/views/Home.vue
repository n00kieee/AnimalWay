<template>
  <div>
    <v-carousel
      show-arrows="hover"
      hide-delimiter-background
      height="550px"
    >
      <v-carousel-item
        v-for="(slide,i) in slides"
        :key="i"
        :src="slide.src"
        cover
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
const slides = [
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
  },
]
</script>

<style scoped>

</style>
