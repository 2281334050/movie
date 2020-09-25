<template>
	<view>
		<view class="grid col-3 padding-lr-sm margin-top-sm">
			<view class="flex flex-direction align-center" @tap="navTo('/pages/discover/anchorDetail?id='+item.id)" v-for="item in list" :key="item.id">
				<view class="cu-avatar round xxl" :style="`background-image: url(${item.avatar});`">
				</view>
				<view style="line-height: 40upx; width: 100%;" class="text-center">
					{{item.nickName}}
				</view>
			</view>
		</view>
		<view :class="['cu-load bg-header',hasMore ? 'loading':'over']"></view>
	</view>
</template>

<script>
	import {
		MEDIA_GETINDEXANCHOR
	} from "@/common/requestApi"
	export default {
		components: {

		},
		data() {
			return {
				page: 1,
				hasMore: true,
				list: [],
				type: 1 //类型，1推荐-新晋主播，2附近-精选主播
			};
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
		methods: {
			getData() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				MEDIA_GETINDEXANCHOR({
					pageNo: this.page,
					type: this.type
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
		},
		onLoad(options) {
			switch (options.type * 1) {
				case 1:
					uni.setNavigationBarTitle({
						title: '新晋主播'
					});
					break;
				case 2:
					uni.setNavigationBarTitle({
						title: '附近主播'
					});
					break;
				default:
					uni.setNavigationBarTitle({
						title: '新晋主播'
					});
					break;

			}
			this.type = options.type ? options.type : 1
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>

</style>
