import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/views/Home.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Profile from "@/views/Profile.vue";
import Ads from "@/views/Ads.vue";
import AddAds from "@/views/AddAds.vue";
import AdDetails from "@/views/AdDetails.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/ads',
    name: 'ads',
    component: Ads,
    meta: {
      title: 'Объявления',
      requiresAuth: false,
    }
  },
  {
    path: '/add-ads',
    name: 'add-ads',
    component: AddAds,
    meta: {requiresAuth: true}
  },
  {
    path: '/animal/:id',
    name: 'add-details',
    component: AdDetails,
    meta: {requiresAuth: false}
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {requiresAuth: true}
  },
  {
    path: '/profile/user-ads',
    name: 'user-ads',
    component: Profile,
    meta: {requiresAuth: true}
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn,
    meta: {requiresAuth: false}
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
    meta: {requiresAuth: false}
  },
]

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user)
      },
      reject
    )
  })
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("Нет доступа");
      next('/sign-in');
    }
  } else {
    next();
  }
});

export default router
