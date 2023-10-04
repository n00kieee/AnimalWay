<template>
  <v-footer :fixed="true" app color="grey-darken-4" class="d-flex align-center justify-center">
    <span>Animal Way &copy;{{ year }}</span>
    <v-spacer></v-spacer>
    <v-btn
      v-for="icon in icons"
      :key="icon"
      class="mx-4"
      :color="icon.color"
      :icon="icon.icon"
      variant="plain"
      size="small"
    >
    </v-btn>
  </v-footer>
</template>

<script setup>
const year = new Date().getFullYear()

const icons = [
  {
    icon: 'fab fa-vk',
    color: 'blue darken-7'
  },
  {
    icon: 'fab fa-telegram',
    color: 'blue darken-7'
  },
  {
    icon: 'fab fa-instagram',
    color: 'pink-darken-1'
  }
]
</script>

<style scoped>

</style>
