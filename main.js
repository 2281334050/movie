import Vue from 'vue'
import App from './App'
import store from './store/index'
import cuCustom from './colorui/components/cu-custom.vue'
import {
	tools,formatTime
} from 'common/util.js'
Vue.config.productionTip = false
Vue.prototype.navTo = tools.navTo
Vue.prototype.goBack = tools.goBack
Vue.prototype.openUrl = tools.openUrl
Vue.prototype.formatTime = formatTime
Vue.prototype.checkPower = tools.checkPower
Vue.component("cu-custom",cuCustom)
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
