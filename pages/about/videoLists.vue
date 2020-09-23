<template>
	<view>
		<view>
			<videoItem v-for="item in list" @videoTap="goDetail(item,0)" @authorTap="goDetail(item,1)" :cover="item.coverUri"
			 :author="item.publishAvatar" :authorName="item.publishNickname" :name="item.videoTitle" :icon="[item.unlocks,item.views,item.likes]"></videoItem>
			<view :class="['cu-load bg-header',hasMore ? 'loading':'over']"></view>
		</view>
	</view>
</template>

<script>
	import videoItem from "@/components/about/video-item"
	import {
		USER_UNLOCKMEDIALIST,
		USER_FAVORITESMEDIALIST,
		USER_LIKEMEDIALIST,
		MEDIA_GETINDEXVIDEO
	} from "@/common/requestApi"
	export default {
		components: {
			videoItem
		},
		data() {
			return {
				Datafun: null,
				page: 1,
				hasMore: true,
				list: [],
				videoType: 1 //热门解锁
			};
		},
		methods: {
			getData() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				this.Datafun({
					mediaType: 1,
					pageNo: this.page,
					type: this.videoType
				}).then(res => {
					uni.hideLoading()
					if (res.status) {
						if (res.data.length < 20) {
							this.hasMore = false
						}
						this.list = this.list.concat(res.data)
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
		},
		onReachBottom() { //触底加载更多
			if (!this.hasMore) return;
			this.page++
			this.getData()
		},
		async onPullDownRefresh() {
			this.page = 1
			this.hasMore = true
			this.list = []
			await this.getData()
			uni.stopPullDownRefresh()
		},
		onLoad(options) {
			switch (options.type * 1) {
				default: //我的解锁
					this.Datafun = USER_UNLOCKMEDIALIST
					uni.setNavigationBarTitle({
						title: '我的解锁'
					});
					break;
				case 1: //我的收藏
					this.Datafun = USER_FAVORITESMEDIALIST
					uni.setNavigationBarTitle({
						title: '我的收藏'
					});
					break;
				case 2: //我的点赞
					this.Datafun = USER_LIKEMEDIALIST
					uni.setNavigationBarTitle({
						title: '我的点赞'
					});
					break;
				case 3: //热门解锁
					this.Datafun = MEDIA_GETINDEXVIDEO
					this.videoType = 1
					uni.setNavigationBarTitle({
						title: '热门解锁'
					});
					break;
				case 4: //官方精选
					this.Datafun = MEDIA_GETINDEXVIDEO
					this.videoType = 2
					uni.setNavigationBarTitle({
						title: '官方精选'
					});
					break;
				case 5: //vip精选
					this.Datafun = MEDIA_GETINDEXVIDEO
					this.videoType = 4
					uni.setNavigationBarTitle({
						title: 'VIP精选'
					});
					break;
			}
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>

</style>
