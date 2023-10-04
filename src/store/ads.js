import {defineStore} from 'pinia'
import {getDatabase, ref, set, push, onValue} from "firebase/database";
import {getAuth} from "firebase/auth";
import router from "@/router";

export const useAdsStore = defineStore('ads', {
  state: () => ({
    ads: {
      id: '',
      name: '',
      phone: '',
      userAdsId: '',
      image: [],
      date: '',
      animal: '',
      city: '',
      address: '',
      age: '',
      typeAd: '',
      gender: '',
      description: '',
    },
    adDetails: null,
    adsList: [],
    isLoggedIn: false,
    errMsg: '',
    successMsg: false
  }),
  actions: {
    async createAd(ads) {
      try {
        const auth = getAuth();
        const userId = auth.currentUser.uid;
        const db = getDatabase();
        const adsRef = ref(db, 'users/' + userId + '/animal');
        const newAdsRef = push(adsRef);
        await set(newAdsRef, {
          id: ads.id,
          name: ads.name,
          phone: ads.phone,
          userAdsId: userId,
          image: ads.image,
          date: ads.date,
          animal: ads.animal,
          city: ads.city,
          address: ads.address,
          age: ads.age,
          typeAd: ads.typeAd,
          gender: ads.gender,
          description: ads.description
        });
        const adsCopy = ref(db, 'animals/');
        const newAdsCopy = push(adsCopy);
        await set(newAdsCopy, {
          id: ads.id,
          name: ads.name,
          phone: ads.phone,
          userAdsId: userId,
          image: ads.image,
          date: ads.date,
          animal: ads.animal,
          city: ads.city,
          address: ads.address,
          age: ads.age,
          typeAd: ads.typeAd,
          gender: ads.gender,
          description: ads.description
        });
        await router.push('/profile')
      } catch (error) {
        console.log(error)
      }
    },
    async getAllAds() {
      const db = getDatabase();
      const allAds = ref(db, 'animals/');
      onValue(allAds, (allAdsSnap) => {
        this.adsList = allAdsSnap.val()
      });
    },
    async getUserAds() {
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const db = getDatabase();
      const userAds = ref(db, 'users/' + userId);
      onValue(userAds, (userAdsSnap) => {
        userAdsSnap.forEach((userAdsChildSnapshot) => {
          this.adsList = userAdsChildSnapshot.val()
        });
      });
    },
    async getAdsDetails({id}) {
      const db = getDatabase();
      const allAds = ref(db, 'animals/');
      onValue(allAds, (detailsAdsSnap) => {
        detailsAdsSnap.forEach((detailsChildSnapshot) => {
          if (detailsChildSnapshot.val().id === +id) {
            this.adDetails = detailsChildSnapshot.val()
          }
        });
      });
    },
  }
})

