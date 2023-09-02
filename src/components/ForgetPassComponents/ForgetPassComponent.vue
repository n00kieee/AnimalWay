<template>
  <v-dialog
    v-model="props.active"
    width="500px"
  >
    <v-card>
      <v-toolbar
        dark color="primary"
        title="Восстановление пароля"
      >
        <v-btn icon dark @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <ForgetPassModal v-if="!store.successMsg"/>
        <ForgetSuccess v-if="store.successMsg"/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {defineProps} from "vue";
import ForgetPassModal from "@/components/ForgetPassComponents/ForgetPassModal.vue";
import {useAuthStore} from "@/store/user";
import ForgetSuccess from "@/components/ForgetPassComponents/ForgetSuccess.vue";

const store = useAuthStore()

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>

</style>
