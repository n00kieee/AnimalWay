<template>
  <v-container>
    <v-form>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="state.name"
          @input="updateName($event.target.value)"
          :disabled="isDisable"
          :error-messages="v$.name.$errors.map(e => e.$message)"
          @blur="v$.name.$touch"
          prepend-inner-icon="fas fa-user"
          name="name"
          required
          variant="outlined"
          density="compact"
          :value="name"
        >
        </v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="state.email"
          @input="updateEmail($event.target.value)"
          :disabled="isDisable"
          :error-messages="v$.email.$errors.map(e => e.$message)"
          @blur="v$.email.$touch"
          prepend-inner-icon="fas fa-envelope"
          name="email"
          required
          variant="outlined"
          density="compact"
          :value="email"
        >
        </v-text-field>
      </v-col>
      <v-btn v-if="!isDisable" @click.prevent="isDisable = !isDisable">Редактировать</v-btn>
      <v-btn v-if="!isDisable" @click.prevent="updateData">Сохранить</v-btn>
    </v-form>
    <v-snackbar
      location="top"
      color="red"
      :timeout="2000"
      v-model="snackbarError">
      {{ errMsg }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import {useAuthStore} from "@/store/user";
import {emailValid$, minLength$, required$} from "@/plugins/validators";
import {helpers} from '@vuelidate/validators';
import {useVuelidate} from "@vuelidate/core";

const store = useAuthStore();

const getUserData = computed(() => {
  return store;
})

const initialState = {
  name: '',
  email: '',
}

const state = reactive({
  ...initialState,
})

const name = ref(getUserData.value.displayName);
const email = ref(getUserData.value.email);

const rules = {
  name: {
    minLength: minLength$(3),
    required$
  },
  email: {
    required$,
    email: helpers.withMessage('Электронный адрес некорректен', emailValid$),
  },

}

const v$ = useVuelidate(rules, state)

const updateName = (update) => {
  name.value = update;
}

const updateEmail = (update) => {
  email.value = update;
}

const isDisable = ref(true);
const errMsg = ref('');
const snackbarError = ref(false);


const updateData = async () => {
  isDisable.value = false;
  await v$.value.$validate(v$.value.$invalid);
  await store.updateUserData(state.email, state.name);
  snackbarError.value = true;
  return errMsg.value = store.errMsg;
}
</script>

<style scoped>

</style>
