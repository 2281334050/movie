<template>
	<view>
		<view class='text-center padding-top-xl margin-bottom-xl'>
			<view class='cu-avatar  round xxl' :style="`background-image:url(${$store.state.UserInfo.avatar}); border:1upx solid #fff;`"></view>
		</view>
		<view class="cu-list menu sm-border padding-lr-sm">
			<!-- <view class="cu-item arrow" @tap="showmodal('1')"> -->
			<view class="cu-item arrow" @tap="navTo('/pages/about/changeDetail?type=1')">
				<view class="content padding-tb-sm">
					<text class="text-white  text-bold">昵称</text>
				</view>
				<view class='right text-right' style='min-width:60px;'>
					<text class='text-gray'>{{$store.state.UserInfo.nickName || "xxxx"}}</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<text class="text-white  text-bold">性别</text>
				</view>
				<view class='right text-right' style='min-width:60px;'>
					<picker :range="gender" @change="genderChange">
						<text class="text-gray">
							{{ gender[UserInfo.gender] || "男"}}
						</text>
					</picker>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<text class="text-white  text-bold">星座</text>
				</view>
				<view class='right text-right' style='min-width:60px;'>
					<picker :range="constellation" @change="constellationChange">
						<text class="text-gray">
							{{ constellation[constellationIndex] }}
						</text>
					</picker>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<text class="text-white  text-bold">地区</text>
				</view>
				<view class='right text-right' style='min-width:160px;'>
					<pickRegions :defaultRegion="defaultRegion" @getRegion="handleGetRegion">
						<text class='text-gray'>{{regionName}}</text>
					</pickRegions>
				</view>
			</view>
			<view class="cu-item arrow" @tap="navTo('/pages/about/changeDetail?type=2')">
				<view class="content padding-tb-sm" style='min-width:60px;'>
					<text class="text-white  text-bold">签名</text>
				</view>
				<view class='right'>
					<text class='text-gray'>{{$store.state.UserInfo.selfDescription || "心有猛虎,细嗅蔷薇"}}</text>
				</view>
			</view>
			<view class="cu-item arrow"  @tap="navTo('/pages/about/changeDetail?type=3')">
				<view class="content padding-tb-sm" style='min-width:90px;'>
					<text class="text-white  text-bold">主页说明</text>
				</view>
				<view class='right'>
					<text class='text-gray'>{{Homepage || "这个人很懒,什么都没留下"}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		components: {
			pickRegions
		},
		data() {
			return {
				UserInfo: {},
				skin: true,
				modalName: false,
				modalType: 1,
				gender: ["女", "男", "隐私"],
				constellation: ["水瓶座", "双鱼座", "白羊座", "金牛座", "双子座", "巨蟹组", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座"],
				constellationIndex: 0,
				region: [],
				// defaultRegionCode: '440112',
				defaultRegion: ['广东省', '广州市', '番禺区'],
				// nickName: "", //昵称
				// selfDescription: "", //个性签名
				Homepage: "" //主页
			};
		},
		methods: {
			subMitDetail() {
				console.log(this.UserInfo)
			},
			// 获取选择的地区
			handleGetRegion(region) {
				console.log(region)
				this.region = region
			},
			genderChange(e) {
				console.log(e)
				//获得对象的 detail的 value
				//通过数组的下标改变显示在页面的值
				this.UserInfo.gender = e.detail.value;
			},
			constellationChange(e) {
				console.log(e)
				//获得对象的 detail的 value
				//通过数组的下标改变显示在页面的值
				this.constellationIndex = e.detail.value;
			},
			showmodal(type) {
				this.modalType = type
				this.modalName = true
			},
			hideModal(e) {
				this.modalName = false
			},
			doNothing() {
				console.log('阻止穿透')
			}
		},
		onLoad() {
			this.checkPower(1)
			this.UserInfo = JSON.parse(JSON.stringify(this.$store.state.UserInfo))
			// this.genderIndex = this.UserInfo.gender
			// this.defaultRegionCode = this.UserInfo.constellation
			// this.nickName = this.UserInfo.nickname
			// this.selfDescription = this.UserInfo.selfDescription

		},
		computed: {
			...mapState({
				UserInfoOld: state => state.UserInfo
			}),
			regionName() {
				// 转为字符串
				if (!this.region.length) {
					return this.UserInfo.constellation || '广东省 广州市 番禺区'
				} else {
					return this.region.map(item => item.name).join(' ')
				}
			},
			canSubmit() {
				//  && this.constellation[this.constellationIndex] == this.$store.state.UserInfo.constellation
				if (this.UserInfo.nickname == this.$store.state.UserInfo.nickname && this.UserInfo.gender == this.$store.state.UserInfo
					.gender && this.UserInfo.selfDescription == this.$store.state.UserInfo.selfDescription) {
					return false
				} else {
					return true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-list {
		&.menu {
			>.cu-item {
				background-color: transparent;
				min-height: 114upx;

				&::after {
					left: 30upx;
					width: 200%;
					border-color: rgba($color: #fff, $alpha: .1);
				}

				.content {}
			}
		}
	}
</style>
