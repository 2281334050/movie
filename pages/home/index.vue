<template>
	<view class="tabs">
		<view :style="[{height:CustomBar + 'px'}]">
			<scroll-view scroll-x class="nav solid-bottom fixed header" :style="style">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-yellow cur':''" v-for="(item,index) in Tabs" :key="index"
					 @tap="tabSelect" :data-id="index">
						{{item.label}}
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="content padding-bottom-sm">
			<Vip v-show="TabCur === 0" :videos="vipData.videos" :banner="vipData.banner"></Vip>
			<Recommend v-show="TabCur === 1" :youlike="homeData.youlike" :hot="homeData.hot" :featured="homeData.featured"
			 :anchors="homeData.anchors" :banner="homeData.banner"></Recommend>
			<Free v-show="TabCur === 2" :videos="freeData.videos" :banner="freeData.banner"></Free>
			<Vicinity v-show="TabCur === 3" :dynamic="vicinityData.dynamic" :anchors="vicinityData.anchors"></Vicinity>
		</view>
	</view>
</template>

<script>
	import Recommend from "@/components/home/recommend"
	import Vip from "@/components/home/vip"
	import Vicinity from "@/components/home/vicinity"
	import Free from "@/components/home/free"
	import {
		HOME_VIDEOS,
		MEDIA_GETINDEXANCHOR,
		MEDIA_GETINDEXVIDEO,
		MEDIA_BANNER,
		MEDIA_NAEARBYACTIVITY
	} from "@/common/requestApi"
	export default {
		components: {
			Recommend,
			Vip,
			Vicinity,
			Free
		},
		data() {
			return {
				TabCur: 1,
				Tabs: [{
					label: 'VIP精选',
				}, {
					label: '推荐',
				}, {
					label: '限时免费',
				}, {
					label: '附近',
				}],
				// 首页的变量
				homeData: {
					banner: [],
					youlike: [],
					hot: [],
					featured: [],
					anchors: []
				},
				//限时免费
				freeData: {
					videos: [],
					banner: [],
					page: 1,
					limit: 10,
					hasMore: true
				},
				//vip
				vipData: {
					videos: [],
					banner: [],
					page: 1,
					limit: 10,
					hasMore: true
				},
				vicinityData: {
					dynamic: [],
					anchors: [],
					page: 1,
					limit: 10,
					hasMore: true
				},
				keepLive:[]
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id * 1;
				// 缓存操作
				if(!this.keepLive.some(v=>v===this.TabCur)){//第一次打开
					this.getPageData()
					this.keepLive.push(this.TabCur)
				}
			},
			loadMore() {

			},
			getPageData() {
				switch (this.TabCur) {
					case 0:
						MEDIA_GETINDEXVIDEO({
							pageNo: this.vipData.page,
							type: 4
						}).then(res => {
							if (res.status) {
								if (res.data.length < this.vipData.limit) {
									this.vipData.hasMore = false
								}
								if (res.data.length) {
									this.vipData.videos = this.vipData.videos.concat(res.data)
								}
							}
						})
						if (this.vipData.page === 1) {
							MEDIA_BANNER({
								type: 3
							}).then(res => {
								if (res.status) {
									this.vipData.banner = res.data
								}
							})
						}
						break;
					case 1: //首页
						// 获取所有视频类别
						HOME_VIDEOS().then(res => {
							this.homeData.youlike = res.youlike
							this.homeData.hot = res.hot
							this.homeData.featured = res.featured
						})
						//新晋主播
						MEDIA_GETINDEXANCHOR({
							pageNo: 1,
							type: 1
						}).then(res => {
							if (res.status) {
								this.homeData.anchors = res.data
							}
						})
						MEDIA_BANNER({
							type: 1
						}).then(res => {
							if (res.status) {
								this.homeData.banner = res.data
							}
						})
						break;
					case 2:
						MEDIA_GETINDEXVIDEO({
							pageNo: this.freeData.page,
							type: 3
						}).then(res => {
							if (res.status) {
								if (res.data.length < this.freeData.limit) {
									this.freeData.hasMore = false
								}
								if (res.data.length) {
									this.freeData.videos = this.freeData.videos.concat(res.data)
								}
							}
						})
						if (this.freeData.page === 1) {
							MEDIA_BANNER({
								type: 2
							}).then(res => {
								if (res.status) {
									this.freeData.banner = res.data
								}
							})
						}
						break;
					case 3:
						MEDIA_NAEARBYACTIVITY({
							pageNo: this.vicinityData.page,
							type:1
						}).then(res => {
							if (res.status) {
								if (res.data.length < this.vicinityData.limit) {
									this.vicinityData.hasMore = false
								}
								if (res.data.length) {
									this.vicinityData.dynamic = this.vicinityData.dynamic.concat(res.data)
								}
							}
						})
						if (this.vicinityData.page === 1) {
							MEDIA_GETINDEXANCHOR({
								pageNo: 1,
								type: 2
							}).then(res => {
								if (res.status) {
									this.vicinityData.anchors = res.data
								}
							})
						}
						break;
					default:
						break;
				}
			},
		},
		created() {
			this.getPageData()
		},
		onReachBottom() { //触底加载更多
			switch (this.TabCur) {
				case 0:
					if (!this.vipData.hasMore) return;
					this.vipData.page++
					this.getPageData()
					break;
				case 2:
					if (!this.freeData.hasMore) return;
					this.freeData.page++
					this.getPageData()
					break;
				case 3:
					if (!this.vicinityData.hasMore) return;
					this.vicinityData.page++
					this.getPageData()
					break;
				default:
					break;
			}
		},
		computed: {
			style() {
				return `height:${this.CustomBar}px;padding-top:${this.StatusBar}px;`;
			}
		}
	}
</script>

<style scoped lang="scss">
	.header {
		background-color: #242A37
	}
</style>
