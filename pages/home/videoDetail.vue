<template>
	<view>
		<view class="video-box">
			<video class="video fixed" :poster="videoDetail.coverUri" :src="videoDetail.videoUri?videoDetail.videoUri:videoDetail.previewUri" :autoplay="videoDetail.videoUri?false:true" controls :style="style"></video>
		</view>
		<view class="video-detail">
			<view class="cu-bar text-gray">
				<view class="action">
					<text class="cuIcon-like"></text>
					{{videoDetail.likes}}
					<text class="cuIcon-unlock margin-left-lg"></text>
					{{videoDetail.unlocks}}
				</view>
				<view class="action">
					{{videoDetail.publishAt}}
				</view>
			</view>
			<view class="cu-bar">
				<view class="action text-bold">{{videoDetail.videoTitle}}</view>
			</view>
			<view class="cu-bar margin-top padding-bottom-sm solid-bottom-xl">
				<view class="action">
					<view class="flex flex-direction text-center">
						<text v-if="!videoDetail.currentIsFavorites" class="cuIcon-like" style="font-size: 20px;"></text>
						<text v-else class="cuIcon-likefill text-red" style="font-size: 20px;"></text>
						<text @tap="addFavorites" class="text-sm">喜欢</text>
					</view>
					<view class="flex flex-direction text-center margin-left">
						<text v-if="!videoDetail.currentIsLike" class="cuIcon-appreciate" style="font-size: 20px;"></text>
						<text v-else class="cuIcon-appreciatefill text-red" style="font-size: 20px;"></text>
						<text @tap="addLike" class="text-sm">点赞</text>
					</view>
				</view>
				<view v-if="!videoDetail.currentIsUnlock" class="action">
					<button @tap="unLock" class="cu-btn line-yellow">
						<img src="../../static/diamond.png" alt="" style="width: 45upx;height: auto;ertical-align: middle;">
						{{videoDetail.price}}
						加入观看
						</button>
				</view>
			</view>
		</view>
		<view class="anchor">
			<view class="cu-bar margin-top">
				<view class="action">
					<view class="cu-avatar round lg" :style="`background-image: url(${authorDetail.avatar});`">
					</view>
					<view class="name flex flex-direction margin-left-sm">
						<text class="text-lg text-bold">{{authorDetail.nickname}}</text>
						<!-- 	<text class="text-gray">1222</text> -->
					</view>
				</view>
				<view class="action">
					<button v-if="!authorDetail.isFollow" @tap="follow" class="cu-btn line-yellow">关注</button>
					<button v-else disabled class="cu-btn">已关注</button>
					<!-- <button class="cu-btn line-yellow margin-left-sm">私信</button> -->
				</view>
			</view>
			<scroll-view scroll-x class="nav solid-bottom margin-top-sm">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-yellow cur':''" v-for="(item,index) in Tabs" :key="index"
					 @tap="tabSelect" :data-id="index">
						{{item.label}}
					</view>
				</view>
			</scroll-view>
			<view v-show="TabCur===0" class="list">
				<videoItem v-for="item in Tabs[TabCur].data" @videoTap="goDetail(item,0)" @authorTap="goDetail(item,1)" :cover="item.coverUri"
				 :author="item.publishAvatar" :authorName="item.publishNickname" :name="item.videoTitle" :icon="[item.unlocks,item.views,item.likes]"></videoItem>
				<view :class="['cu-load bg-header',Tabs[TabCur].hasMore ?'loading':'over']"></view>
			</view>
			<view v-show="TabCur===1" class="list">
				<videoItem v-for="item in Tabs[TabCur].data" @videoTap="goDetail(item,0)" @authorTap="goDetail(item,1)" :cover="item.coverUri"
				 :author="item.publishAvatar" :authorName="item.publishNickname" :name="item.videoTitle" :icon="[item.unlocks,item.views,item.likes]"></videoItem>
				<view :class="['cu-load bg-header',Tabs[TabCur].hasMore ? 'loading':'over']"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		USER_GETMEDIADETAIL,
		USER_GETANCHORMEDIALIST,
		USER_ANCHORINFO,
		MEDIA_GETINDEXVIDEO,
		USER_FOLLOW,
		USER_UNLOCKMEDIA,
		USER_FAVORITES,
		USER_LIKE
	} from "@/common/requestApi"
	import videoItem from "@/components/about/video-item"
	export default {
		components: {
			videoItem
		},
		data() {
			return {
				TabCur: 0,
				Tabs: [{
					label: '更多他的视频',
					data: [],
					page: 1,
					hasMore: true
				}, {
					label: '推荐视频',
					data: [],
					page: 1,
					hasMore: true
				}],
				id: null,
				uid: null,
				videoDetail: {},
				authorDetail: {},
				fun: null,
				keepLive: []
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id * 1;
				// 缓存操作
				if (!this.keepLive.some(v => v === this.TabCur)) { //第一次打开
					this.getData()
					this.keepLive.push(this.TabCur)
				}
			},
			getDetail() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				USER_GETMEDIADETAIL({
					id: this.id,
					mediaType: 1
				}).then(res => {
					uni.hideLoading()
					if (res.status) {
						this.videoDetail = res.data
						uni.setNavigationBarTitle({
							title: res.data.videoTitle
						});
					} else {
						uni.showToast({
							title: res.msg,
							mask: true,
							icon: 'none'
						})
					}
				})
			},
			getData() {
				switch (this.TabCur) {
					case 0:
						this.fun = USER_GETANCHORMEDIALIST
						break;
					case 1:
						this.fun = MEDIA_GETINDEXVIDEO
						break;
					default:
						this.fun = USER_GETANCHORMEDIALIST
						break;
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				this.fun({
					anchorId: this.uid,
					mediaType: 1,
					pageNo: this.Tabs[this.TabCur].page,
					type: 1
				}).then(res => {
					uni.hideLoading()
					if (res.status) {
						if (res.data.length < 20) {
							this.Tabs[this.TabCur].hasMore = false
						}
						this.Tabs[this.TabCur].data = this.Tabs[this.TabCur].data.concat(res.data)
					} else {
						uni.showToast({
							title: res.msg,
							mask: true,
							icon: 'none'
						})
					}
				})
			},
			getAuthorDetail() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				USER_ANCHORINFO({
					anchorId: this.uid
				}).then(res => {
					uni.hideLoading()
					if (res.status) {
						this.authorDetail = res.data
					} else {
						uni.showToast({
							title: res.msg,
							mask: true,
							icon: 'none'
						})
					}
				})
			},
			goDetail(item, type) {
				if (!type) { //视频详情跳转
					this.navTo(`/pages/home/videoDetail?id=${item.id}&uid=${item.publishId}`)
				} else if (type === 1) { //作者详情跳转
					this.navTo(`/pages/discover/anchorDetail?id=${item.publishId}`)
				}
			},
			follow() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				USER_FOLLOW({
					anchorId: this.uid
				}).then(res => {
					if (res.status) {
						uni.hideLoading()
						uni.showToast({
							title: '关注成功',
							mask: true,
							icon: 'success',
							success: () => {
								this.authorDetail.isFollow = true
							}
						})
					} else {
						uni.showToast({
							title: res.msg,
							mask: true,
							icon: 'none'
						})
					}
				})
			},
			addFavorites() {
				uni.showLoading()
				USER_FAVORITES({
					mediaType: 1,
					mediaId: this.id
				}).then(res => {
					uni.hideLoading()
					if (res.status) {
						this.videoDetail.currentIsFavorites = true
					} else {
						uni.showToast({
							title: res.msg,
							mask: true,
							icon: 'none'
						})
					}
				})
			},
			addLike() {
				uni.showLoading()
				USER_LIKE({
					mediaType: 1,
					mediaId: this.id,
					type: 1
				}).then(res => {
					uni.hideLoading()
					if (res.status) {
						this.videoDetail.currentIsLike = true
					} else {
						uni.showToast({
							title: res.msg,
							mask: true,
							icon: 'none'
						})
					}
				})
			},
			unLock() {
				uni.showModal({
					title: '视频解锁',
					content: `您将以${this.videoDetail.price}钻石的价格解锁该视频，是否确认？`,
					success: (res)=> {
						if (res.confirm) {
							uni.showLoading()
							USER_UNLOCKMEDIA({
								mediaType: 1,
								mediaId: this.id
							}).then(res => {
								uni.hideLoading()
								if (res.status) {
									this.videoDetail.currentIsUnlock = true
									this.videoDetail.videoUri = res.data
									uni.showToast({
										title: '解锁成功',
										mask: true,
										icon: 'none'
									})
								} else {
									uni.showToast({
										title: res.msg,
										mask: true,
										icon: 'none'
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}

				})

			}
		},
		async onPullDownRefresh() {
			this.Tabs[this.TabCur].page = 1
			this.Tabs[this.TabCur].hasMore = true
			this.Tabs[this.TabCur].data = []
			await this.getData()
			await this.getDetail()
			await this.getAuthorDetail()
			uni.stopPullDownRefresh()
		},
		onReachBottom() { //触底加载更多
			if (!this.Tabs[this.TabCur].hasMore) return;
			this.Tabs[this.TabCur].page++
			this.getData()
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id * 1
				this.getDetail()
			}
			if (options.uid) {
				this.uid = options.uid * 1
				this.getData()
				this.getAuthorDetail()
			}
			console.log(this.CustomBar)
		},
		computed: {
			style() {
				//#ifdef APP-PLUS
				return `top:0`;
				// #endif
				//#ifdef H5
				return `top:${this.CustomBar}px`;
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fixed {
		position: fixed;
		z-index: 996;
	}

	uni-modal .uni-modal {
		color: #000 !important;
	}

	.video-box {
		height: 420upx;

		.video {
			width: 100%;
			height: 420upx;
		}
	}

	.name {
		line-height: 40upx;
	}
</style>
