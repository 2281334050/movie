import config from '../config/config.js'
/**
 * 封装request方法
 * @param url
 * @param data
 * @param method
 * @returns {Promise}
 */
function requestTask(url, data, method) {
	return uni.request({
		url: config.SERVER + url,
		data: data,
		method: method,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token') || ''
		}
	}).then(([err, res]) => {
		if (res) {
			if (res.data.code === 401) { // token出错的code
				uni.removeStorageSync('token')
				//store.commit('SetUserInfo',{})
				uni.reLaunch({
					url: '/pages/login/index'
				})
				uni.showToast({
					title: '重新登录',
					icon: 'none',
					mask: true
				})
				return {
					status: 0,
					message: res.data.message
				}
			}
			if (res.data.newToken) {
				uni.setStorageSync('token', res.data.newToken)
			}
			return res.data
		} else {
			return {
				status: 0,
				message: '接口调用失败'
			}
		}
	}).catch(err => {
		console.log('接口调用失败:' + url)
		return err
	})
}
export default requestTask
