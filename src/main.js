import Vue from 'vue'
import App from './App.vue'
// import LicensePlateKeyboard from 'license-plate-keyboard'

Vue.config.productionTip = false
    // Vue.use(LicensePlateKeyboard);

new Vue({
    render: h => h(App),
}).$mount('#app')