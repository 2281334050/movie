<template>
	<view>
		<!-- 模拟头部 -->
		<view class="fixed text-white">
			<cu-custom isBack>
				<block slot="content">
					<text class="text-xl"></text>
				</block>
			</cu-custom>
		</view>
		<!-- logo -->
		<view class="header-bg flex justify-center align-center">
			<view class="logo">
				<!-- <img src="../../static/LOGO.png"></img> -->
			</view>
		</view>
		<!-- form表单 -->
		<view class="padding-lr-sm">
			<view class="text-center text-xl margin-tb-lg text-bold">注册账号</view>
			<form>
				<!-- 用户名 -->
				<view class="cu-form-group  margin-top acc-box">
					<view class="title text-xl">
						<text class="cuIcon-people"></text>
						<!-- <image src="../../static/zhanghao.svg" class='cu-avatar icon' mode='aspectFit'></image> -->
					</view>
					<input  v-model="userName"  placeholder="请输入注册账号" name="userName"></input>
				</view>
				<!-- 密码 -->
				<view class="cu-form-group  margin-top">
					<view class="title text-xl">
						<text class="cuIcon-lock"></text>
						<!-- <image src="../../static/mima.svg" class='cu-avatar icon' mode='aspectFit'></image> -->
					</view>
					<input v-model="passWord" @input='passWordInput' placeholder="密码" :password="passWordEye" name="password"></input>
					<text @click="passWordEye = !passWordEye" :class="[passWordEye?'cuIcon-attention':'cuIcon-attentionfill']"
					 confirm-type="done"></text>
					<!-- 					<image @click="passWordEye = !passWordEye" confirm-type="done" :src="passWordEye?'../../static/yankai.svg':'../../static/yanguan.svg'"
					 mode='aspectFit' class='cu-avatar sm icon' ></image> -->
				</view>
				<!-- 确认密码 -->
				<view class="cu-form-group  margin-top">
					<view class="title text-xl">
						<text class="cuIcon-lock"></text>
						<!-- <image src="../../static/mima.svg" class='cu-avatar icon' mode='aspectFit'></image> -->
					</view>
					<input v-model="passWordReg" @input='passWordRegInput' placeholder="确认密码" :password="passWordEyeReg" name="passWordReg"></input>
					<text @click="passWordEyeReg = !passWordEyeReg" :class="[passWordEyeReg?'cuIcon-attention':'cuIcon-attentionfill']"
					 confirm-type="done"></text>
					<!-- 					<image @click="passWordEyeReg = !passWordEyeReg" confirm-type="done" :src="passWordEyeReg?'../../static/yankai.svg':'../../static/yanguan.svg'"
					 mode='aspectFit' class='cu-avatar sm icon'></image> -->
				</view>
				<!-- 手机号码 -->
				<view class="cu-form-group  margin-top">
					<view class="title text-xl">
						<text class="cuIcon-mobile"></text>
						<!-- <image src="../../static/shouji.svg" class='cu-avatar icon' mode='aspectFit' ></image> -->
					</view>
					<input v-model="phoneNum" placeholder="请输入您的邮箱" type="text"  name="phoneNum"></input>
				</view>
				<!-- 验证码 -->
				<view class="cu-form-group  margin-top">
					<view class="title text-xl">
						<text class="cuIcon-safe"></text>
						<!-- <image src="../../static/yanzhengma.svg" class='cu-avatar icon' mode='aspectFit'></image> -->
					</view>
					<input v-model="code" placeholder="请输入验证码" type="number" name="code" maxlength="6"></input>
					<button v-if="!sendding" @tap="sendMSG" class="cu-btn bg-yellow text-white shadow padding-0 padding-lr-xs"><text class='text-sm'>获取验证码</text></button>
					<view v-else class="cu-avatar round sm bg-blue">
						{{countDown}}
					</view>
				</view>
				<!-- 推广码 -->
				<view class="cu-form-group  margin-top">
					<view class="title text-xl">
						<text class="cuIcon-mail"></text>
						<!-- <image src="../../static/yaoqingma.svg" class='cu-avatar icon' mode='aspectFit' ></image> -->
					</view>
					<input v-model="promoCode" :disabled="promoCodeStatus" placeholder="请输入推广码" type="number" name="promoCode"></input>
				</view>
				<button @tap="reg" class="cu-btn block bg-yellow text-white  xl margin-top-lg">注册并登录</button>
				<view class="margin-top-lg text-center text-gray text-bold padding-bottom-sm">
					如需帮助，请<text class="text-yellow" @tap="openUrl($store.state.config.onlineService)">联系客服</text>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/colorui/components/cu-custom.vue'
	import {
		REGISTER,
	} from "@/common/requestApi"
	export default {
		components: {
			cuCustom
		},
		data() {
			return {
				userName: '', //用户名
				userListShow: false, //账号列表展开
				userNameList: [], //可选择的账号使用列表
				passWord: '', //密码
				passWordReg: '', //密码确认
				passWordEye: true, //查看密码
				passWordEyeReg: true, //查看确认的密码
				phoneNum: '', //手机号码
				code: '', //验证码
				countDown: 60, //发送倒计时
				sendding: false, //发送冷却中
				timer: null, //暂存发送事项
				promoCode: '', //推广码
				promoCodeStatus: false //连接上存在推广码
			};
		},
		onLoad(options) {
			if (options.promoCode * 1) {
				this.promoCode = options.promoCode
				this.promoCodeStatus = true
			}
		},
		onShow() {

		},
		methods: {
			passWordInput(event) {
				setTimeout(() => {
					this.passWord = event.detail.value.replace(/[^A-Za-z0-9]/g, '')
				}, 100)
			},
			passWordRegInput(event) {
				setTimeout(() => {
					this.passWordReg = event.detail.value.replace(/[^A-Za-z0-9]/g, '')
				}, 100)
			},
			sendMSG() {
				if (this.phoneNum === "" || !/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(this.phoneNum)) {
					uni.showToast({
						title: '请正确填写正确邮箱',
						icon: 'none'
					})
					return false
				}
				let params = {
					phone: this.phoneNum,
					type: 1
				}
				uni.showLoading({
					title: '正在发送',
					mask: true
				})
				SENDMESSAGE(params).then(res => {
					uni.hideLoading()
					if (res.status) {
						this.sendding = true //进入冷却
						uni.showToast({
							icon: 'none',
							title: '验证码发送成功'
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			reg() { //注册
				//判断账号
				if (!this.userName) {
					uni.showToast({
						title: '账号不能为空',
						icon: "none"
					})
					return false;
				}
				//判断密码
				if (!this.passWord || !this.passWordReg) {
					uni.showToast({
						title: '密码不能为空',
						icon: "none"
					})
					return false;
				}
				// if (!/^[0-9a-zA-Z]{6,16}$/.test(this.passWord)) {
				// if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.passWord)) {
				// 	uni.showToast({
				// 		title: '密码6-16个字母和数字组成,不区分大小写',
				// 		icon: "none"
				// 	})
				// 	return false;
				// }
				if (this.passWord !== this.passWordReg) {
					uni.showToast({
						title: '两次输入的密码不一致',
						icon: "none"
					})
					return false;
				}
				//判断手机号
				if (this.phoneNum === "" || !/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(this.phoneNum)) {
					uni.showToast({
						title: '请正确填写邮箱',
						icon: 'none'
					})
					return false
				}
				//判断验证码
				if (!this.code) {
					uni.showToast({
						title: '请填写验证码',
						icon: 'none'
					})
					return false
				}
				//推广码
				// if (!this.promoCode) {
				// 	uni.showToast({
				// 		title: '请填写推广码',
				// 		icon: 'none'
				// 	})
				// 	return false
				// }
				// console.log(this.passWord.toLocaleLowerCase())
				let params = {
					username: this.userName,
					password: this.passWord.toLocaleLowerCase()
					// phone: this.phoneNum,
					// phoneVerify: this.code,
					// promoCode: this.promoCode
				}
				uni.showLoading({
					title: "正在提交",
					mask: true
				})
				REGISTER(params).then(res => {
					uni.hideLoading()
					if (res.status) {
						uni.showToast({
							title: '注册成功',
							success: () => {
								uni.setStorageSync('token', res.data)
								this.$store.dispatch('getUserInfo') //获取用户详情
								uni.switchTab({
									url: '/pages/home/index'
								})
							}
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		},
		watch: {
			sendding(val) {
				if (val) {
					this.timer = setInterval(() => {
						this.countDown -= 1
						if (this.countDown === 0) {
							this.sendding = false
						}
					}, 1000)
				} else {
					clearInterval(this.timer)
					this.countDown = 60
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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

			img {
				width: 100%;
				height: 100%;
				vertical-align: center;
			}
		}
	}

	.acc-box {
		position: relative;

		.acc-list {
			position: absolute;
			height: 400upx;
			left: 0;
			top: 90upx;
			z-index: 1;

			.acc-item {
				width: 50%;
				height: 80upx;
			}
		}
	}

	.icon {
		background: #f5f5f5;
		width: 44upx;
		height: 44upx
	}
</style>
