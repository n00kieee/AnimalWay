import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})
