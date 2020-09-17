<template>
	<view>
		<view class="bg-img flex align-center" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg');height: 336upx">
		</view>
		<!-- 视频 动态 喜欢  头像 -->
		<view class="flex detail align-center">
			<view class="cu-avatar round margin-left" :style="`background-image: url(${detail.avatar});height: 150upx;width: 150upx;border: 2upx solid #fff;`">
				<!-- <image class="vip" src="../../static/vip1.png" mode=""></image> -->
			</view>
			<view class="num-box" style="margin-left: 50upx;">
				<view class="text-center text-xl">
					{{detail.activityCount}}
				</view>
				<view class="text-center text-sm">
					动态
				</view>
			</view>
			<view class="num-box margin-left">
				<view class="text-center text-xl">
					{{detail.videoCount}}
				</view>
				<view class="text-center text-sm">
					视频
				</view>
			</view>
			<view class="num-box margin-left">
				<view class="text-center text-xl">
					{{detail.followCount}}
				</view>
				<view class="text-center text-sm">
					喜欢
				</view>
			</view>
		</view>
		<!-- 关注 -->
		<view>
			<view v-if="!detail.isFollow" class="handler-btn bg-yellow text-center" @tap="toFollow">关注</view>
			<view v-else class="handler-btn bg-gray text-center">已关注</view>
		</view>
		<!-- 姓名描述 -->
		<view class="padding-lr">
			<view>
				<text class="text-lg">@{{detail.nickname}}</text>
				<!-- <view class="cu-tag radius bg-yellow sm margin-left-xs">LV36</view> -->
			</view>
			<view class="show-self margin-top-xs">
				{{detail.selfDescription}}
			</view>
		</view>
		<!-- 视频板块 -->
		<scroll-view scroll-x class="nav solid-bottom margin-top-sm">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-yellow cur':''" v-for="(item,index) in Tabs" :key="index"
				 @tap="tabSelect" :data-id="index">
					{{item.label}}
				</view>
			</view>
		</scroll-view>
		<!-- 动态 -->
		<view v-if="TabCur === 0">
			<discoverBlock class="margin-top-xs" :name="item.publishNickname" v-for="(item,key) in Tabs[TabCur].data" :key="key"
			 :list="item.images?item.images.split(','):[]" :text="item.content" :type="item.type" :date="item.publishAt" :avatar="item.publishAvatar"></discoverBlock>
		</view>
		<!-- 作品 -->
		<view v-if="TabCur === 1" class="padding-lr-xs flex flex-wrap">
			<view  v-for="(item,key) in Tabs[TabCur].data" :key="key" @tap="navTo('/pages/home/videoDetail?id='+id)">
				<videoItem  :cover="item.coverUri" :author="item.publishAvatar"  :authorName="item.publishNickname" :name="item.videoTitle" :icon="[item.unlocks,99,99]" :time="60000"></videoItem>
			</view>
		</view>
	</view>
</template>

<script>
	import discoverBlock from '@/components/home/discover-block'
	import videoItem from "@/components/about/video-item"
	import {
		USER_ANCHORINFO,
		USER_FOLLOW,
		USER_GETANCHORMEDIALIST
	} from "@/common/requestApi"
	export default {
		components: {
			discoverBlock,
			videoItem
		},
		data() {
			return {
				TabCur: 0,
				id: null,
				Tabs: [{
					label: '动态',
					data: [],
					page: 1,
					hasMore: true
				}, {
					label: '作品',
					data: [],
					page: 1,
					hasMore: true
				}],
				detail: {},
				keepLive: []
			}
		},
		onLoad(options) {
			console.log(options)
			if (options.id) {
				this.id = options.id * 1
				this.getDetail()
				this.getData()
				this.keepLive.push(this.TabCur) //缓存
			} else {
				return
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id * 1;
				if (!this.keepLive.some(v => v === this.TabCur)) { //第一次打开
					this.getData()
					this.keepLive.push(this.TabCur)
				}
			},
			onReachBottom() { //触底加载更多
				if (!this.Tabs[this.TabCur].hasMore) return;
				this.Tabs[this.TabCur].page++
				this.getData()
			},
			getData() {
				USER_GETANCHORMEDIALIST({
					anchorId: this.id,
					pageNo: this.Tabs[this.TabCur].page,
					mediaType: this.TabCur ? 1 : 2
				}).then(res => {
					if (res.status) {
						console.log(res.data)
						if (res.data.length < 20) {
							this.Tabs[this.TabCur].hasMore = false
						}
						this.Tabs[this.TabCur].data = this.Tabs[this.TabCur].data.concat(res.data)
					}
				})
			},
			getDetail() {
				USER_ANCHORINFO({
					anchorId: this.id
				}).then(res => {
					if (res.status) {
						this.detail = res.data
						uni.setNavigationBarTitle({
							title: '@' + res.data.nickname
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							mask: true
						})
					}
				})
			},
			toFollow() {
				USER_FOLLOW({
					anchorId: this.id
				}).then(res => {
					if (res.status) {

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							mask: true
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		margin-top: -20upx;

		.vip {
			width: 30upx;
			height: 30upx;
			position: absolute;
			bottom: 0;
			right: 0;
		}

		.num-box {
			line-height: 40upx;
			padding: 0 30upx;

			&.solid-right {
				&::after {
					border-color: rgba($color: #fff, $alpha: .1);
				}
			}
		}
	}

	.handler-btn {
		width: 240upx;
		line-height: 60upx;
		margin-left: 260upx;
		border-radius: 6upx;

		&.disabled {
			background-color: #303849;
			color: #fff;
		}
	}
</style>
