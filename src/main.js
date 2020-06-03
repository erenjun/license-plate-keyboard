import Vue from 'vue'
import App from './App.vue'
import LicensePlateKeyboard from './plugin'

Vue.config.productionTip = false
Vue.use(LicensePlateKeyboard);

new Vue({
    render: h => h(App),
}).$mount('#app')