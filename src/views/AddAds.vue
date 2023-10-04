<template>
  <v-container>
    <v-card
        class="mx-auto"
        max-width="874"
    >
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span class="mr-2">{{ currentTitle }}</span>
        <v-avatar
            color="primary"
            size="24"
            v-text="step"
        ></v-avatar>
      </v-card-title>

      <v-window v-model="step">
                <v-window-item :value="1">
                  <v-card-text>
                    <UploadComponent/>
                    <!--                                <span class="text-caption text-grey-darken-1">-->
                    <!--                                Загрузите фото-->
                    <!--                              </span>-->
                  </v-card-text>
                </v-window-item>
        <v-window-item :value="2">
          <v-card-text>
            <v-row>
              <v-col
                  cols="12"
                  md="4"
              >
                <v-text-field
                    v-model="state.name"
                    label="Ваше Имя"
                    required
                    variant="outlined"
                    density="compact"
                    @input="v$.name.$touch"
                    @blur="v$.name.$touch"
                    :error-messages="v$.name.$errors.map(e => e.$message)"
                ></v-text-field>
              </v-col>

              <v-col
                  cols="12"
                  md="4"
              >
                <v-text-field
                    v-model="state.phone"
                    label="Номер телефона"
                    required
                    variant="outlined"
                    density="compact"
                    :model-value="mask.masked(phone)"
                    @update:model-value="value => phone = mask.unmasked(value)"
                    @input="v$.phone.$touch"
                    @blur="v$.phone.$touch"
                    :error-messages="v$.phone.$errors.map(e => e.$message)"
                ></v-text-field>
              </v-col>

              <v-col
                  cols="12"
                  md="4"
              >
                <v-text-field
                    v-model="state.date"
                    type="date"
                    label="Дата"
                    required
                    variant="outlined"
                    density="compact"
                    @input="v$.date.$touch"
                    @blur="v$.date.$touch"
                    :error-messages="v$.date.$errors.map(e => e.$message)"
                >
                </v-text-field>
              </v-col>

              <v-col
                  cols="12"
                  md="4"
              >
                <v-radio-group
                    inline
                    v-model="state.animal"
                >
                  <v-radio
                      label="Собака"
                      color="info"
                      value="Собака"
                  ></v-radio>
                  <v-radio
                      label="Кошка"
                      color="info"
                      value="Кошка"
                  ></v-radio>
                </v-radio-group>
              </v-col>

              <v-col
                  cols="12"
                  md="4"
              >
                <v-radio-group
                    inline
                    v-model="state.typeAd"
                >
                  <v-radio
                      label="Потерян"
                      color="info"
                      value="Потерян"
                  ></v-radio>
                  <v-radio
                      label="Найден"
                      color="info"
                      value="Найден"
                  ></v-radio>
                  <v-radio
                      label="Отдам"
                      color="info"
                      value="Отдам"
                  ></v-radio>
                </v-radio-group>
              </v-col>

              <v-col
                  cols="12"
                  md="4"
              >
                <v-text-field
                    v-model="state.city"
                    label="Город"
                    required
                    variant="outlined"
                    density="compact"
                    @input="v$.city.$touch"
                    @blur="v$.city.$touch"
                    :error-messages="v$.city.$errors.map(e => e.$message)"
                ></v-text-field>
              </v-col>

              <v-col
                  cols="12"
                  md="4"
              >
                <v-text-field
                    v-model="state.address"
                    label="Адрес"
                    required
                    variant="outlined"
                    density="compact"
                    @input="v$.address.$touch"
                    @blur="v$.address.$touch"
                    :error-messages="v$.address.$errors.map(e => e.$message)"
                ></v-text-field>
              </v-col>

              <v-col
                  cols="12"
                  md="4"
              >
                <v-text-field
                    v-model="state.age"
                    label="Возраст"
                    variant="outlined"
                    density="compact"
                    type="number"
                    @input="v$.age.$touch"
                    @blur="v$.age.$touch"
                    :error-messages="v$.age.$errors.map(e => e.$message)"
                ></v-text-field>
              </v-col>

              <v-col
                  cols="12"
                  md="4"
              >
                <v-select
                    v-model="state.gender"
                    :clearable="true"
                    label="Пол"
                    required
                    variant="outlined"
                    density="compact"
                    :items="['Мужской', 'Женский']"
                    @input="v$.gender.$touch"
                    @blur="v$.gender.$touch"
                    :error-messages="v$.gender.$errors.map(e => e.$message)"
                ></v-select>
              </v-col>
            </v-row>
            <!--            <span class="text-caption text-grey-darken-1">-->
            <!--            Please enter a password for your account-->
            <!--          </span>-->
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <v-card-text>
            <v-textarea
                v-model="state.description"
                :counter="300"
                name="input-7-1"
                label="Подробная информация"
                auto-grow
                variant="outlined"
                density="compact"
                @input="v$.description.$touch"
                @blur="v$.description.$touch"
                :error-messages="v$.description.$errors.map(e => e.$message)"
            ></v-textarea>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="4">
          <div class="pa-4 text-center">
            <v-img
                class="mb-4"
                contain
                height="128"
                src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
              Объявление добавлено!
            </h3>
            <span class="text-caption text-grey">Спасибо!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
            v-if="step > 1"
            variant="text"
            @click="step--"
        >
          Назад
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            v-if="step < 3"
            color="primary"
            variant="flat"
            @click="step++"
        >
          Вперед
        </v-btn>

        <v-btn
            v-if="step > 2"
            color="primary"
            variant="flat"
            @click="createAd"
        >
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import {useAdsStore} from "@/store/ads";
import {minLength$, required$} from "@/plugins/validators";
import {useVuelidate} from "@vuelidate/core";
import UploadComponent from "@/components/UploadComponent.vue";
import {useFilesStore} from "@/store/files";
import {Mask} from "maska";

const initialState = {
  id: Date.now(),
  name: '',
  phone: '',
  image: '',
  date: '',
  animal: '',
  city: '',
  address: '',
  age: '',
  typeAd: '',
  gender: '',
  description: ''
}

const step = ref(1);
const currentTitle = computed(() => {
  switch (step.value) {
    case 1:
      return 'Загрузите фото'
    case 2:
      return 'Данные'
    default:
      return 'Подробная информация'
  }
})

const phone = ref('');
const mask = new Mask({mask: '+7(###)-###-##-##'});

const loading = ref(false);

const state = reactive({
  ...initialState,
})

const rules = {
  name: {
    minLength: minLength$(3),
    required$
  },
  phone: {
    required$,
    minLength: minLength$(17),
  },
  date: {
    required$
  },
  city: {
    required$,
    minLength: minLength$(3)
  },
  address: {
    required$,
    minLength: minLength$(3)
  },
  age: {
    required$,
  },
  gender: {
    required$,
  },
  description: {
    minLength: minLength$(10),
    required$
  },
}

const v$ = useVuelidate(rules, state);

const store = useAdsStore()
const snackbar = ref(false)
const errMsg = ref('');

const storeUpload = useFilesStore()
const adsImages = computed(() => {
  return storeUpload.adsImages
});

const createAd = async () => {
  loading.value = true;
  await store.createAd(state, state.image = adsImages.value);
  loading.value = store.isLoggedIn;
  snackbar.value = true;
  return errMsg.value = store.errMsg;
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css");
</style>
