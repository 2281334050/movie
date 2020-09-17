<template>
	<view>
		<view>
			<video-item v-for="i in 10"></video-item>
		</view>
	</view>
</template>

<script>
	import videoItem from "@/components/about/video-item"
	import {
		USER_UNLOCKMEDIALIST,
		USER_FAVORITESMEDIALIST,
		USER_LIKEMEDIALIST
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
				list: []
			};
		},
		methods: {
			getData() {
				this.Datafun({
					mediaType: 1,
					pageNo: this.page
				}).then(res => {
					if (res.status) {
						if (res.data.length < 20) {
							this.hasMore = false
						}
						this.list = this.list.concat(res.data)
					}
				})
			}
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
			}
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>

</style>
