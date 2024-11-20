import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { router } from './assets/routers.js';
import vuetify from './plugins/vuetify.js';

// Importa los componentes de Vuetify que estás usando
import 'vuetify/components';
import 'vuetify/directives';

const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount('#app');