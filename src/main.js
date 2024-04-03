// import './assets/main.css';
import 'primevue/resources/themes/aura-dark-teal/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.min.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'

const firebaseConfig = {
	apiKey: "AIzaSyAvezgNKgBZBSXVGV0KvODJAYvQANGXwxU",
	authDomain: "proxy-jwt-tokens.firebaseapp.com",
	projectId: "proxy-jwt-tokens",
	storageBucket: "proxy-jwt-tokens.appspot.com",
	messagingSenderId: "702618554189",
	appId: "1:702618554189:web:f54d90680fbcfd2deef104"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.mount('#app')
