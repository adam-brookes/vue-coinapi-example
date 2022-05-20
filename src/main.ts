import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import '@/main.scss';

import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

import Vuelidate from '@vuelidate/core';
Vue.use(Vuelidate)
//
// const date = new Date(value)
// return date.toLocaleDateString(['en-US'], {month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})

Vue.filter('date', function(value)  {
  debugger;
  let date: Date = null;
   if(!(value instanceof Date)) {
     date = new Date(value);
   }
   else {
     date = value;
   }

  return date.toLocaleDateString(['en-US'], {month: 'short', day: '2-digit', year: 'numeric'});
});

Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return formatter.format(value);
});

Vue.use(VueMaterial)

new Vue({
  router,
  render: h => h(App),
  pinia
}).$mount('#app')
