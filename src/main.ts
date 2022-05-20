import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import '@/main.scss';

import Vuelidate from '@vuelidate/core';
Vue.use(Vuelidate)

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
}).$mount('#app')
