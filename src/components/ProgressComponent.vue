<template>
  <div class="d-flex justify-space-around">
    <v-progress-linear
      :model-value="progress"
      :buffer-value="progressPercent"
      color="cyan"
    ></v-progress-linear>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  progress: Number
})

const progressPercent = computed(()=> Math.round(props.progress))
</script>

<style scoped>

</style>
