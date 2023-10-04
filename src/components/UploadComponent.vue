<template>
  <v-file-input
    v-model="data.files"
    prepend-icon="fas fa-image"
    :show-size="1000"
    :counter="true"
    variant="outlined"
    density="compact"
    :multiple="true"
    label="Добавьте фото"
    @change="uploadImg"
    @input="fileAdded"
  >
  </v-file-input>
  <template v-for="fileName in data.files" :key="fileName">
    <v-chip
      small
      text-color="white"
      class="me-2"
      color="#295671"
      closable
      @click:close="remove(fileName.index)">
      {{ fileName.name }}
    </v-chip>
  </template>
  <ProgressComponent class="pt-2" v-if="progress" :progress="progress"/>
</template>

<script setup>
import {computed, reactive, watch} from 'vue'
import {useFilesStore} from "@/store/files";
import ProgressComponent from "@/components/ProgressComponent.vue";

const data = reactive({
  currFiles: [],
  previousFiles: [],
  files: []
})

const storeUpload = useFilesStore()
const progress = computed(() => {
  return storeUpload.progress
})

watch(() => data.files, (val) => {
  data.previousFiles = val
})

const fileAdded = () => {
  if (data.previousFiles.length > 0) {
    data.files.push(...data.previousFiles)
  }
}

const remove = (index) => {
  data.files.splice(index, 1)
}

const uploadImg = async () => {
  await storeUpload.uploadImage(data.files);
}
</script>

<style scoped>

</style>
