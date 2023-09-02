import App from './App.vue'
import {initializeApp} from "firebase/app";
import firebaseConfig from "@/config/firebase";
import {createApp} from 'vue'
import {registerPlugins} from '@/plugins'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons"
// вынести иконки

const app = createApp(App)

registerPlugins(app)

initializeApp(firebaseConfig)

app.component('font-awesome-icon', FontAwesomeIcon)
library.add(fas)
library.add(far)
library.add(fab)

app.mount('#app')
