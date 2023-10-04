<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8 ma-10"
      elevation="8"
      max-width="448"
      rounded="lg"
    >

      <v-card-title class="text-center pb-8">
        <span class="text-h5">Регистрация</span>
      </v-card-title>

      <v-text-field
        class="pb-1"
        v-model="state.name"
        :error-messages="v$.name.$errors.map(e => e.$message)"
        label="Имя"
        name="name"
        required
        placeholder="Введите имя"
        @input="v$.name.$touch"
        @blur="v$.name.$touch"
        variant="outlined"
        density="compact"
        prepend-inner-icon="fas fa-user"
      ></v-text-field>

      <v-text-field
        class="pb-1"
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
      ></v-text-field>

      <v-text-field
        class="pb-1"
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

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        :disabled="loading"
        :loading="loading"
        @click.prevent="signUp()"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="state.loading"
        ></v-progress-circular>
        Регистрация
      </v-btn>

      <v-card-text class="text-center">
        <router-link to="/sign-in" class="text-blue text-decoration-none">
          <a
            rel="noopener noreferrer"
            target="_blank"
          >
            Войти
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
</template>

<script setup>
import {reactive, ref} from "vue";
import {useVuelidate} from '@vuelidate/core'
import {helpers} from '@vuelidate/validators'
import {useAuthStore} from "@/store/user";
import {emailValid$, minLength$, required$} from "@/plugins/validators";

const loading = ref(false)
const visible = ref(false)

const initialState = {
  name: '',
  email: '',
  password: '',
}

const state = reactive({
  ...initialState,
})

const rules = {
  name: {
    minLength: minLength$(3),
    required$
  },
  email: {
    required$,
    email: helpers.withMessage('Электронный адрес некорректен', emailValid$),
  },
  password: {
    minLength: minLength$(6),
    required$
  }
}

const v$ = useVuelidate(rules, state)

const store = useAuthStore()
const snackbar = ref(false)
const errMsg = ref('');

const signUp = async () => {
  loading.value = true;
  await v$.value.$validate(v$.value.$invalid);
  await store.register(state.email, state.password, state.name);
  loading.value = store.isLoggedIn;
  snackbar.value = true;
  return errMsg.value = store.errMsg;
}
</script>

<style scoped>

</style>
