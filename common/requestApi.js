import request from './request.js'
import api_list from './Api_list.js'

// 登录
function LOGIN(params = {}) {
	return request(api_list.LOGIN, params, 'POST').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
//注册
function REGISTER(params = {}) {
	return request(api_list.REGISTER, params, 'POST').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
//用户信息
function USER_DETAIL(params = {}) {
	return request(api_list.USER_DETAIL, params, 'GET').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
// banner
function MEDIA_BANNER(params = {}) {
	return request(api_list.MEDIA_BANNER, params, 'GET').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
//首页视频分类
function MEDIA_GETINDEXVIDEO(params = {}) {
	return request(api_list.MEDIA_GETINDEXVIDEO, params, 'GET').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data.list
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
//首页主播列表
function MEDIA_GETINDEXANCHOR(params = {}) {
	return request(api_list.MEDIA_GETINDEXANCHOR, params, 'GET').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data.list
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
//首页附近动态
function MEDIA_NAEARBYACTIVITY(params = {}) {
	return request(api_list.MEDIA_NAEARBYACTIVITY, params, 'GET').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data.list
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
//我的解锁
function USER_UNLOCKMEDIALIST(params = {}) {
	return request(api_list.USER_UNLOCKMEDIALIST, params, 'POST').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data.list
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
//我的收藏
function USER_FAVORITESMEDIALIST(params = {}) {
	return request(api_list.USER_FAVORITESMEDIALIST, params, 'POST').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data.list
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
//我的点赞
function USER_LIKEMEDIALIST(params = {}) {
	return request(api_list.USER_LIKEMEDIALIST, params, 'POST').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data.list
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
// 关注主播
function USER_FOLLOW(params = {}) {
	return request(api_list.USER_FOLLOW, params, 'POST').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
// 主播详情
function USER_ANCHORINFO(params = {}) {
	return request(api_list.USER_ANCHORINFO, params, 'GET').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
// 主播媒体详情
function USER_GETANCHORMEDIALIST(params = {}) {
	return request(api_list.USER_GETANCHORMEDIALIST, params, 'GET').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data.list
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
// 主播媒体详情
function USER_GETMEDIADETAIL(params = {}) {
	return request(api_list.USER_GETMEDIADETAIL, params, 'POST').then(res => {
		var data = {}
		if (res.code === 0) {
			data.status = 1
			data.data = res.data.list
		} else {
			data.status = 0
			data.msg = res.msg
		}
		return data
	})
}
//首页视频获取集合
async function HOME_VIDEOS(){
	let data = {
		youlike:[],
		hot:[],
		featured:[]
	}
	await MEDIA_GETINDEXVIDEO({pageNo:1,type:0}).then(res=>{
		if(res.status){
			data.youlike = res.data
		}
	})
	await MEDIA_GETINDEXVIDEO({pageNo:1,type:1}).then(res=>{
		if(res.status){
			data.hot = res.data
		}
	})
	await MEDIA_GETINDEXVIDEO({pageNo:1,type:2}).then(res=>{
		if(res.status){
			data.featured = res.data
		}
	})
	return data
}


export {
	LOGIN,
	REGISTER,
	USER_DETAIL,
	MEDIA_GETINDEXVIDEO,
	HOME_VIDEOS,
	MEDIA_GETINDEXANCHOR,
	MEDIA_BANNER,
	MEDIA_NAEARBYACTIVITY,
	USER_UNLOCKMEDIALIST,
	USER_FAVORITESMEDIALIST,
	USER_LIKEMEDIALIST,
	USER_FOLLOW,
	USER_ANCHORINFO,
	USER_GETANCHORMEDIALIST,
	USER_GETMEDIADETAIL
}
