<template>
  <v-text-field
    class="pb-3"
    v-model="state.emailForget"
    :error-messages="v$.emailForget.$errors.map(e => e.$message)"
    label="Электронный адрес"
    name="email"
    required
    placeholder="Введите электронный адрес"
    @input="v$.emailForget.$touch"
    @blur="v$.emailForget.$touch"
    variant="outlined"
    density="compact"
    prepend-inner-icon="mdi-email-outline"
  >
  </v-text-field>

  <v-btn
    block
    class="mb-8"
    color="blue"
    size="large"
    variant="tonal"
    @click="forgetPassword"
    :disabled="loading"
    :loading="loading"
  >
    Восстановить
  </v-btn>

  <v-snackbar
    location="top"
    color="red"
    :timeout="2000"
    v-model="snackbarErr">
    {{ errMsg }}
  </v-snackbar>
</template>

<script setup>
import {reactive, ref} from "vue";
import {emailValid$, required$} from "@/plugins/validators";
import {helpers} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useAuthStore} from "@/store/user";

const loading = ref(false)

const initialState = {
  emailForget: ''
}

const state = reactive({
  ...initialState,
})

const rules = {
  emailForget: {
    required$,
    email: helpers.withMessage('Электронный адрес некорректен', emailValid$),
  },
}

const v$ = useVuelidate(rules, state)

const store = useAuthStore();
const snackbarErr = ref(false);
const errMsg = ref('');

const forgetPassword = async () => {
  loading.value = true;
  await v$.value.$validate(v$.value.$invalid);
  await store.forgetPass(state.emailForget);
  loading.value = store.isLoggedIn;
  snackbarErr.value = true;
  return errMsg.value = store.errMsg;
}
</script>

<style scoped>

</style>
