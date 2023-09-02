<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8 ma-10"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-card-title class="text-center pb-8">
        <span class="text-h5">Войти</span>
      </v-card-title>

      <v-text-field
        class="pb-2"
        v-model="state.email"
        :error-messages="v$.email.$errors.map(e => e.$message)"
        label="Электронный адрес"
        name="email"
        required
        placeholder="Введите электронный адрес"
        @input="v$.email.$touch"
        @blur="v$.email.$touch"
        variant="outlined"
        density="compact"
        prepend-inner-icon="fas fa-envelope"
      >

      </v-text-field>

      <v-text-field
        v-model="state.password"
        :append-inner-icon="visible ? 'far fa-eye-slash' : 'far fa-eye'"
        :type="visible ? 'text' : 'password'"
        :error-messages="v$.password.$errors.map(e => e.$message)"
        @input="v$.password.$touch"
        @blur="v$.password.$touch"
        label="Пароль"
        required
        density="compact"
        placeholder="Введите пароль"
        prepend-inner-icon="fas fa-lock"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-end pb-3">
        <a
          class="text-caption text-decoration-none text-blue"
          rel="noopener noreferrer"
          target="_blank"
          style="cursor: pointer"
          @click="resetPass = true"
        >
          Забыли пароль?</a>
      </div>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        :disabled="loading"
        :loading="loading"
        @click="signIn"
      >
        Войти
      </v-btn>
      <v-card-text class="text-center">
        <router-link to="/sign-up" class="text-blue text-decoration-none">
          <a
            rel="noopener noreferrer"
            target="_blank"
          >
            Зарегистрироваться
            <v-icon icon="fas fa-chevron-right"></v-icon>
          </a>
        </router-link>
      </v-card-text>
    </v-card>

    <v-snackbar
      location="top"
      color="red"
      :timeout="2000"
      v-model="snackbar">
      {{ errMsg }}
    </v-snackbar>
  </div>
  <ForgetPassComponent
    v-model="resetPass"
    @close="resetPass = false"
  >
  </ForgetPassComponent>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import {useVuelidate} from '@vuelidate/core'
import {useAuthStore} from "@/store/user";
import {emailValid$, minLength$, required$} from "@/plugins/validators";
import {helpers} from '@vuelidate/validators';
import ForgetPassComponent from "@/components/ForgetPassComponents/ForgetPassComponent.vue";

const loading = ref(false)
const visible = ref(false)
const resetPass = ref(false)

const initialState = {
  email: '',
  password: '',
}

const state = reactive({
  ...initialState,
})

const rules = {
  email: {
    required$,
    email: helpers.withMessage('Электронный адрес некорректен', emailValid$),
  },
  password: {
    required$,
    minLength: minLength$(6),
  }
}

const v$ = useVuelidate(rules, state)

const store = useAuthStore()
const snackbar = ref(false)
const errMsg = ref('');

const signIn = async () => {
  loading.value = true;
  await v$.value.$validate(v$.value.$invalid);
  await store.login(state.email, state.password);
  loading.value = store.isLoggedIn;
  snackbar.value = true;
  return errMsg.value = store.errMsg;
}
</script>

<style scoped>

</style>
