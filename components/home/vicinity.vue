<template>
	<view>
		<!-- 附近 -->
		<view class="margin-lr margin-top-sm radius cu-bar" style="background-color: #303849;">
			<view class="action">
				<text class="cuIcon-locationfill"></text>
				<text class="text-sm">四川省，成都市</text>
			</view>
			<view class="action">
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<!-- 附近精选博主 -->
		<view class="cu-bar">
			<view class="action">
				<text>附近精选博主</text>
			</view>
		</view>
		<scroll-view scroll-x="true" style="height: 170upx" class="scroll-view_H">
			<view class="anchor-item margin-left" v-for="item in anchors" :key="item.id">
				<view class="dashed photo round line-yellow flex justify-center align-center">
					<view class="cu-avatar lg round" :style="`background-image: url(${item.avatar});border: 1upx solid #fff;`"></view>
				</view>
				<view class="name text-cut margin-top-xs text-sm">
					{{item.nickname}}
				</view>
			</view>
		</scroll-view>
		<view class="padding-lr margin-top discover-box">
			<discoverBlock class="margin-top-sm discover" :id="`discover-${item.id}`" v-for="(item,key) in dynamic" :name="item.publishNickname" :avatar="item.publishAvatar" :key="key" :list="item.images?item.images.split(','):[]"
			 :text="item.content" :type="item.type" :date="item.publishAt"></discoverBlock>
		</view>
		<!-- 预约表单 -->
		<view class="cu-modal bottom-modal" :class="modelShow?'show':''">
			<view class="cu-dialog text-left" style="background-color: #303849;">
				<view class="cu-bar solid-bottom justify-end" style="min-height: 100upx;">
					<view class="content">预约主播聊天</view>
					<view class="action" @tap="modelShow = false">
						<text class="cuIcon-close text-gray"></text>
					</view>
				</view>
				<view>
					<!-- 时间选择 -->
					<view class="cu-bar">
						<view class="action">
							<text>选择预约时间</text>
						</view>
					</view>
					<view class="cu-list menu card-menu">
						<view class="cu-item arrow">
							<view class="content">
								<text class="text-grey">日期</text>
							</view>
							<view class="action">
								<picker mode="selector" :value="curDate" :range="dateList" range-key="label" @change="pickChangeDate">
									<view>{{dateList[curDate].label}}</view>
								</picker>
							</view>
						</view>
						<view class="cu-item arrow">
							<view class="content">
								<text class="text-grey">时间</text>
							</view>
							<view class="action flex">
								<picker mode="selector" :value="curTime" :range="dates" range-key="label" @change="pickChangeTime">
									<view>{{dates[curTime].label}}</view>
								</picker>
							</view>
						</view>
						<view class="cu-item arrow">
							<view class="content">
								<text class="text-grey">套餐</text>
							</view>
							<view class="action flex">
								<picker mode="selector" :value="curModel" :range="model" range-key="label" @change="pickChangeModel">
									<view>{{model[curModel].label}}</view>
								</picker>
							</view>
						</view>
					</view>
					<!-- 确认订单详情 -->
					<view class="cu-bar">
						<view class="action">
							<text>服务说明</text>
						</view>
					</view>
					<view class="margin-lr padding radius" style="height: 200upx;background-color: #444B5B;">

					</view>
					<!-- 支付操作 -->
					<view class="cu-bar justify-between" style="min-height: 100upx;">
						<view class="action flex-direction" style="align-items: flex-end;">
							<view>
								<text class="text-gray">全款</text>
								<text class="text-yellow text-price margin-left-xs">888</text>
							</view>
							<view>
								<text class="text-gray">预付款</text>
								<text class="text-red text-price margin-left-xs">211</text>
							</view>
						</view>
						<view class="action">
							<button class="cu-btn bg-yellow text-white">支付</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 选择器 日期 -->

	</view>
	</view>
</template>

<script>
	import discoverBlock from '@/components/home/discover-block'
	let Observer = null;
	export default {
		components: {
			discoverBlock
		},
		props: {
			dynamic: {
				type: Array,
				default: () => []
			},
			anchors: {
				type: Array,
				default: () => []
			}
		},
		watch: {
			dynamic: function(val) {
				if (val.length) {
					this.$nextTick(()=>{
						Observer.relativeToViewport({top: -45,bottom:-50,left:0,right:0}).observe('.discover', (res) => {
							console.log(res);
						})
					})

				}
			}
		},
		created() {
			Observer =  uni.createIntersectionObserver(this,{observeAll:true})
		},
		onUnload() {
			Observer.disconnect()
		},
		data() {
			return {
				modelShow: false,
				curTime: 0,
				model: [{
					label: '套餐一',
					value: 100
				}, {
					label: '套餐二',
					value: 200
				}, {
					label: '套餐三',
					value: 300
				}, {
					label: '套餐四',
					value: 400
				}],
				curModel: 0,
				dateList: [{
					label: '今天',
					value: new Date().getTime()
				}, {
					label: '明天',
					value: new Date(new Date().getTime() + 86400000).setHours(0, 0, 0, 0)
				}, {
					label: '后天',
					value: new Date(new Date().getTime() + 86400000 * 2).setHours(0, 0, 0, 0)
				}, {
					label: '大后天',
					value: new Date(new Date().getTime() + 86400000 * 3).setHours(0, 0, 0, 0)
				}],
				curDate: 0 //今天
			}
		},
		methods: {
			pickChangeDate(e) {
				this.curTime = 0 //选择日期先把时间线清空
				this.curDate = e.detail.value
			},
			pickChangeTime(e) {
				this.curTime = e.detail.value
			},
			pickChangeModel(e) {
				this.curModel = e.detail.value
			}
		},
		computed: {
			dates() {
				let time = new Date(this.dateList[this.curDate].value).setHours(24, 0, 0, 0), //截止时间
					now = this.dateList[this.curDate].value + (this.curDate === 0 ? 3600000 : 0), //开始时间,如果是今天按当前时间的下一个小时开始计算，如果是其他天，就正常计算
					h = [];
				console.log(time, now)
				while (time > now) {
					time -= 3600000
					h.push({
						label: new Date(time).getHours() + '点',
						value: time
					})
				}
				h.sort((a, b) => a.value - b.value)
				return h
			},
		}
	}
</script>

<style lang="scss" scoped>
	.anchor-item {
		display: inline-block;
		width: 130upx;

		.photo {
			width: 130upx;
			height: 130upx;

			&.dashed {
				&::after {
					border-width: 7upx;
				}
			}
		}

		.name {
			width: 100%;
		}
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}



	.cu-list {
		&.menu {
			>.cu-item {
				background-color: #444B5B;
				min-height: 80upx;

				&::after {
					border-color: rgba(0, 0, 0, .3);
				}
			}
		}
	}
</style>
