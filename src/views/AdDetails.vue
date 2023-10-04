<template>
  <v-container v-if="adDetails" class="d-flex justify-center mb-10">

    <v-container class="d-flex justify-center flex-row flex-wrap">
      <v-card
        class="mx-3"
        max-width="874"
      >
        <v-carousel
          hide-delimiters
          show-arrows="hover"
          progress="primary"
          class="mb-3"
        >
          <v-carousel-item
            v-if="!adDetails?.image"
            src="/src/assets/img/placeholder.png"
          >
          </v-carousel-item>
          <v-carousel-item
            v-else
            v-for="(item,i) in adDetails?.image"
            :key="i"
            :src="item"
          >
          </v-carousel-item>
        </v-carousel>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-item class="d-flex justify-lg-start">
          <v-row>
            <v-card-text>
              <v-card-subtitle>
                Дата:
              </v-card-subtitle>
              <div class="font-weight-regular"> {{ adDetails?.date }}</div>
            </v-card-text>

            <v-card-text>
              <v-card-subtitle>
                Номер:
              </v-card-subtitle>
              <div class="font-weight-regular"> {{ adDetails?.id }}</div>
            </v-card-text>

            <v-card-text>
              <v-card-subtitle>
                Животное:
              </v-card-subtitle>
              <div class="font-weight-regular"> {{ adDetails?.animal }}</div>
            </v-card-text>

            <v-card-text>
              <v-card-subtitle>
                Пол:
              </v-card-subtitle>
              <div class="font-weight-regular"> {{ adDetails?.gender }}</div>
            </v-card-text>

            <v-card-text>
              <v-card-subtitle>
                Возраст:
              </v-card-subtitle>
              <div class="font-weight-regular"> {{ adDetails?.age }}</div>
            </v-card-text>
          </v-row>
        </v-card-item>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-item class="d-flex justify-start">
          <v-card-title class="d-flex justify-center mb-3">Подробная информация</v-card-title>
          <v-card-text class="d-flex justify-start">{{ adDetails?.description }}</v-card-text>
        </v-card-item>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-item class="d-flex justify-start">
          <v-row>
            <v-card-text>
              <v-card-subtitle>
                Город:
              </v-card-subtitle>
              <div class="font-weight-regular"> {{ adDetails?.city }}</div>
            </v-card-text>
            <v-card-text>
              <v-card-subtitle>
                Адрес:
              </v-card-subtitle>
              <div class="font-weight-regular"> {{ adDetails?.address }}</div>
            </v-card-text>
          </v-row>
          <v-sheet class="mt-3" :height="250" :width="874">
            <YandexMap/>
          </v-sheet>
        </v-card-item>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-item
          v-if="checkUserId"
          class="d-flex justify-end"
        >
          <v-card-actions>
            <v-btn class="border">Редактировать</v-btn>
            <v-btn class="border">Изменить статус</v-btn>
          </v-card-actions>
        </v-card-item>
      </v-card>

      <v-card
        max-width="874"
        max-height="400"
      >
        <v-col>
          <v-card-item>
            <v-card-text class="d-flex justify-center align-center">
              <v-avatar color="red">
                <span class="text-h5">{{ adDetails?.name[0] }}</span>
              </v-avatar>
              <div class="font-weight-regular text-h6 pl-2">
                {{ adDetails?.name }}
              </div>
            </v-card-text>
          </v-card-item>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-item>
            <v-card-text class="d-flex justify-center align-center flex-column">
              <v-card-subtitle>
                Номер для связи
              </v-card-subtitle>
              <div class="font-weight-regular text-h6">{{ adDetails?.phone }}</div>
            </v-card-text>
          </v-card-item>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-item>
            <v-card-text class="d-flex justify-center align-center flex-column">
              <v-card-subtitle>
                Поделится объявлением
              </v-card-subtitle>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between pl-4">
              <v-btn
                dark fab bottom color="blue darken-7"
                size="large"
                variant="plain"
                target="_blank"
                icon="fab fa-vk"
                :href="`https://vk.com/share.php?url=${url}`"
              ></v-btn>
              <v-btn
                dark fab bottom color="blue darken-7"
                size="large"
                variant="plain"
                target="_blank"
                icon="fab fa-telegram"
                :href="`https://t.me/share/url?url=${url}&text={Посмотри объявление ${adDetails?.typeAd}`"
              ></v-btn>
              <div>
                <v-btn
                  dark fab bottom color="black"
                  @click="copyLink"
                  size="large"
                  variant="plain"
                  target="_blank"
                  icon="fas fa-link"
                >
                </v-btn>
                <v-tooltip
                  activator="parent"
                  location="right"
                >Скопировать ссылку
                </v-tooltip>
              </div>
            </v-card-actions>
          </v-card-item>
        </v-col>
      </v-card>
    </v-container>
  </v-container>
</template>

<script setup>
import {useRoute} from "vue-router";
import {useAdsStore} from "@/store/ads";
import {computed, onMounted} from "vue";
import YandexMap from "@/components/YandexMap.vue";
import {getAuth} from "firebase/auth";

const route = useRoute();
const store = useAdsStore();

onMounted(async () => {
  await store.getAdsDetails({id: route.params.id});
});

const adDetails = computed(() => {
  return store.adDetails;
});

const checkUserId = computed(() =>
  store.adDetails?.userAdsId === getAuth().currentUser.uid
);


const url = window.location.href;

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
};
</script>

<style scoped>
.yandex-container {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
</style>
