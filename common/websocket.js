import config from "@/config/config"
import store from "@/store/index"
export default{
	connected: false,
	connecting: false,
	connect() {
		if (this.connected || this.connecting) {
			uni.showModal({
				content: '正在连接或者已经连接，请勿重复连接',
				showCancel: false
			})
			return false
		}
		this.connecting = true
		uni.showLoading({
			title: '连接中...'
		})
		uni.connectSocket({
			url: config.WEB_SOCKET_SERVER+uni.getStorageSync('token'),
			data() {
				return {
					msg: 'Hello'
				}
			},
			// #ifdef MP
			header: {
				'content-type': 'application/json'
			},
			// #endif
			// #ifdef MP-WEIXIN
			method: 'GET',
			// #endif
			success(res) {
				// 这里是接口调用成功的回调，不是连接成功的回调，请注意
			},
			fail(err) {
				// 这里是接口调用失败的回调，不是连接失败的回调，请注意
			}
		})
		uni.onSocketOpen((res) => {
			this.connecting = false
			this.connected = true
			uni.hideLoading()
			// uni.showToast({
			// 	icon: 'none',
			// 	title: '连接成功'
			// })
			console.log('onOpen', res);
		})
		uni.onSocketError((err) => {
			this.connecting = false
			this.connected = false
			uni.hideLoading()
			uni.showModal({
				content: '连接失败，可能是websocket服务不可用，请稍后再试',
				showCancel: false
			})
			console.log('onError', err);
		})
		uni.onSocketMessage((res) => {//监听收到的消息
			//this.msg = res.data
			store.commit('setMsg',JSON.parse(res.data))
			console.log('onMessage', res)
		})
		uni.onSocketClose((res) => {
			this.connected = false
			// this.startRecive = false
			// this.msg = false
			console.log('onClose', res)
		})
	},
	send() {
		// uni.sendSocketMessage({
		// 	data: 'from ' + platform + ' : ' + parseInt(Math.random() * 10000).toString(),
		// 	success(res) {
		// 		console.log(res);
		// 	},
		// 	fail(err) {
		// 		console.log(err);
		// 	}
		// })
	},
	close() {
		uni.closeSocket()
	}
}
