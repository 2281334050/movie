<script>
	import Vue from 'vue'
	export default {
		globalData: {
			NavFlag: false, //跳转标记
		},
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					
					console.log('sprots')
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + 44;
					// #endif
				}
			})
			if (uni.getStorageSync('token')) {
				this.$store.dispatch('getUserInfo') //获取用户详情
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	/* #ifndef APP-NVUE */
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";

	page {
		background-color: #242A37;
		color: #fff;
	}
	/* #endif */
	/* #ifdef H5 */
	.uni-picker-container{
		z-index: 1026;
	}
	/* #endif */
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
</style>
