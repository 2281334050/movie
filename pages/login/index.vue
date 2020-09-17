<template>
	<view>
		<!-- 模拟头部 -->
		<view class="fixed text-white">
			<cu-custom leftSlot @leftTap="handlerClick">
				<block slot="left">
					<text class="cuIcon-back"></text>
				</block>
				<block slot="content">
					<text class="text-xl"></text>
				</block>
			</cu-custom>
		</view>
		<!-- logo -->
		<view class="header-bg flex justify-center align-center">
			<view class="logo margin-top-lg">
				<!-- <image src="@/static/LOGO.png" mode='aspectFit'></image> -->
			</view>
		</view>

		<!-- form表单 -->
		<view class="padding-lr-sm">
			<view class="text-center text-xl margin-tb-lg text-bold">登录账号</view>
			<form>
				<!-- 用户名 -->
				<view class="cu-form-group margin-top">
					<view class="title text-xl">
						<text class="cuIcon-people"></text>
						<!-- <image src="../../static/zhanghao.svg" class='cu-avatar icon' mode='aspectFit'></image> -->
					</view>
					<input v-model="userName" placeholder="用户名" name="userName"></input>
				</view>
				<!-- 密码 -->
				<view class="cu-form-group margin-top">
					<view class="title text-xl">
						<text class="cuIcon-lock"></text>
					</view>
					<input v-model="passWord" @input='passWordInput' placeholder="密码" :password="passWordEye" name="password"></input>
										<text @click="passWordEye = !passWordEye" :class="[passWordEye?'cuIcon-attention':'cuIcon-attentionfill']"
					 confirm-type="done"></text>
<!-- 					<image @click="passWordEye = !passWordEye" confirm-type="done" :src="passWordEye?'../../static/yankai.svg':'../../static/yanguan.svg'"
					 mode='aspectFit' class='cu-avatar sm  icon'></image> -->
				</view>
				<view class="flex justify-between remember-pwd margin-top align-center padding-lr-sm">
					<view @click="rememberPwd=!rememberPwd">
						<text v-if="rememberPwd" class="text-yellow cuIcon-squarecheck margin-right-xs"></text>
						<text v-else class="cuIcon-square margin-right-xs"></text>
						记住账号密码
					</view>
					<text class="text-df" @tap="navTo('forget')">忘记密码</text>
				</view>
				<button @tap="login" class="cu-btn block bg-yellow  xl margin-top-xxl text-white">登录账号</button>
				<button class="cu-btn block xl margin-top-sm line line-gray" @tap="navTo('register')">注册账号</button>
				<view class="margin-top-xxl text-center text-gray text-bold">
					如需帮助，请<text class="text-yellow" @tap="openUrl($store.state.config.onlineService)">联系客服</text>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	import {
		LOGIN
	} from "@/common/requestApi.js"
	export default {
		components: {
			cuCustom
		},
		data() {
			return {
				userName: '',
				passWord: '',
				passWordEye: true,
				rememberPwd: false, //忘记密码
				backPage: '', //从哪个页面跳转至此，
				backType: 0 //跳转类型 1为正常跳转 0为tabbar页面跳转
			};
		},
		onShow() {
			if (uni.getStorageSync('name')) {
				this.userName = uni.getStorageSync('name')
				this.passWord = uni.getStorageSync('pwd')
				this.rememberPwd = true
			}
		},
		onLoad(options) {
			this.backPage = options.backPage
			this.backType = options.backType
		},
		methods: {
			passWordInput(event) {
				this.$nextTick(() => {
					this.passWord = event.detail.value.replace(/[^A-Za-z0-9]/g, '')
				})
			},
			handlerClick() {
				uni.switchTab({
					url: '/pages/home/index'
				})
			},
			login() {
				// 登录
				let name = this.userName;
				let pwd = this.passWord.toLocaleLowerCase();
				// 判断用户名或密码不为空
				if (name === "") {
					uni.showToast({
						title: '用户名不能为空',
						icon: 'none',
						mask: false,
					})
					return false;
				} else if (pwd === "") {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none',
						mask: false,
					})
					return false;
				}
				// 用户名限制
				// if (!/^[0-9a-zA-Z]{6,16}$/.test(name)) {
				// 	uni.showToast({
				// 		title: '用户账号错误',
				// 		icon: 'none',
				// 		mask: false,
				// 	})
				// 	return false;
				// }
				// 用户密码限制				
				// if (!/^[0-9a-zA-Z]{6,16}$/.test(pwd)) {
				// if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(pwd)) {
				// 	uni.showToast({
				// 		title: '密码错误',
				// 		icon: 'none',
				// 		mask: false,
				// 	})
				// 	return false;
				// }
				let params = {
					username: name,
					password: pwd.toLocaleLowerCase()
				};
				uni.showLoading({
					title: '登陆中',
					mask: true
				})
				LOGIN(params).then(res => {
					uni.hideLoading()
					if (res.status === 1) {
						uni.showToast({
							title: '登陆成功',
							icon: 'success',
						})
						//跳转的几种类型
						 uni.setStorageSync('token', res.data)
						 this.$store.dispatch('getUserInfo') //获取用户详情
						setTimeout(() => {
							if (this.backPage) { //存在跳转地址
								if (this.backType * 1) { //正常跳转
									this.navTo(this.backPage)
								} else {
									uni.switchTab({
										url: this.backPage
									})
								}

							} else { //不存在跳转地址，直接跳转至首页
								uni.switchTab({
									url: '/pages/home/index'
								})
							}
						}, 1000)

						if (this.rememberPwd) {
							uni.setStorage({
								key: 'name',
								data: this.userName
							});
							uni.setStorage({
								key: 'pwd',
								data: this.passWord
							});
						} else {
							uni.removeStorage({
								key: 'name'
							});
							uni.removeStorage({
								key: 'pwd'
							});
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.fixed {
		position: fixed;
		top: 0;
		width: 100%;
	}

	.header-bg {
		// background: linear-gradient(-49deg,
		// 	#7a97e6 20%,
		// 	#0853da 100%);
		// background: url(../../static/moneyBg.png) no-repeat center;
		// background-size: 100% 100%;
		height: 360upx;
		// border-radius: 0 0 60upx 0;

		.logo {
			width: 160upx;
			height: 160upx;

			image {
				width: 100%;
				height: 100%;
				vertical-align: center;
			}
		}
	}

	.icon {
		background: #f5f5f5;
		width: 44upx;
		height: 44upx
	}
</style>
