import {defineStore} from 'pinia'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {uuid} from 'vue-uuid';

export const useFilesStore = defineStore('files', {
  state: () => ({
    progress: 0,
    adsImages: [],
  }),
  actions: {
    async uploadImage(files) {
      const NAMESPACE = "65f9af5d-f23f-4065-ac85-da725569fdcd";
      const promises = [];
      const storage = getStorage();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file !== null) {
          const storageRef = ref(storage, "animals/" + "/" + "/" + uuid.v5(file.name, NAMESPACE));
          // Могут быть ошибки если названия файлов одинаковые, посмотреть доку фаербэйса про методанные
          promises.push(uploadBytesResumable(storageRef, file).then(uploadResult => {
              return getDownloadURL(uploadResult.ref)
            })
          )
          const uploadImg = uploadBytesResumable(storageRef, file);
          uploadImg.on('state_changed',
            (snapshot) => {
              this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              console.log(error)
            })
        }
      }
      const photos = await Promise.all(promises);
      this.adsImages = photos
    }
  }
})

