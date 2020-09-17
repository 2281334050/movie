function formatTime(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
	var o = {
		'M+': date.getMonth() + 1,
		'D+': date.getDate(),
		'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
		'H+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'q+': Math.floor((date.getMonth() + 3) / 3),
		'S': date.getMilliseconds()
	}
	var week = {
		'0': '\u65e5',
		'1': '\u4e00',
		'2': '\u4e8c',
		'3': '\u4e09',
		'4': '\u56db',
		'5': '\u4e94',
		'6': '\u516d'
	}
	if (/(Y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') +
			week[date.getDay() + ''])
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
		}
	}
	return fmt
}


function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}

function numberComma(source, length = 3) {
	source = String(source).split(".");
	source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), "$1,");
	return source.join(".");
}

var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};
// 功能函数
var tools = {
	goBack: function() {
		//#ifdef H5
		window.history.go(-1)
		//#endif
		//#ifdef APP-PLUS
		uni.navigateBack({
			delta: 1
		});
		//#endif
	},
	navTo: function(url) { //路由跳转
		if (getApp().globalData.NavFlag) {
			return
		}
		getApp().globalData.NavFlag = true
		uni.navigateTo({
			url: url,
			complete: () => {
				getApp().globalData.NavFlag = false
			}
		})
	},
	openUrl: function(url) { //新开网页
		//#ifdef APP-PLUS
		plus.runtime.openURL(url)
		//#endif
		//#ifdef H5
		window.open(url, '_blank')
		//#endif
	},
	checkPower:function(backtype){ //检查是否登录
		let token = uni.getStorageSync('token')
		// console.log(token)
		if (!token) {
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			let url = page.$route.fullPath;
			uni.reLaunch({
				url: '/pages/login/index?backPage=' + url + '&backType=' + backtype
			});
		}
		return token
	}
}
module.exports = {
	formatTime,
	formatLocation,
	dateUtils,
	numberComma,
	tools
}
