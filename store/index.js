import Vue from 'vue'
import Vuex from 'vuex'
import {
	USER_DETAIL
} from "@/common/requestApi"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		UserInfo: {},
	},
	mutations: {
		setUserInfo(state, obj) {
			state.UserInfo = obj
		}
	},
	actions: {
		getUserInfo({
			commit,
			state
		}) {
			USER_DETAIL().then(res => {
				if (res.status) {
					commit("setUserInfo", res.data)
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				}
			})
		}
	}
})

export default store
