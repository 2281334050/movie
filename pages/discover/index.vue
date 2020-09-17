<template>
	<view>
		<!-- 发现 -->
		<view style="height: 44px;">
			<scroll-view scroll-x class="nav solid-bottom fixed header" :style="style">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-yellow cur':''" v-for="(item,index) in Tabs" :key="index"
					 @tap="tabSelect" :data-id="index">
						{{item.label}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 推荐 -->
		<view v-show="TabCur === 0">
			<discoverBlock class="margin-top-xs" :name="item.publishNickname" v-for="(item,key) in Tabs[TabCur].data" :key="key"
			 :list="item.images?item.images.split(','):[]" :text="item.content" btnText="关注" @handlerTap="handlerTap(item.publishId)"
			 :type="item.type" :date="item.publishAt" :avatar="item.publishAvatar" @goDetail="goDetail(item.publishId)"></discoverBlock>
		</view>
		<!-- 已关注 -->
		<view v-show="TabCur === 1">
			<discoverBlock class="margin-top-xs" :name="item.publishNickname" v-for="(item,key) in Tabs[TabCur].data" :key="key"
			 :list="item.images?item.images.split(','):[]" :text="item.content" :type="item.type"  @goDetail="goDetail(item.publishId)" :date="item.publishAt" :avatar="item.publishAvatar"></discoverBlock>
		</view>
	</view>
</template>

<script>
	import discoverBlock from '@/components/home/discover-block'
	import {
		MEDIA_NAEARBYACTIVITY,
		USER_FOLLOW
	} from "@/common/requestApi"
	export default {
		components: {
			discoverBlock
		},
		data() {
			return {
				TabCur: 0,
				Tabs: [{
					label: '推荐',
					data: [],
					page: 1,
					hasMore: true
				}, {
					label: '关注',
					data: [],
					page: 1,
					hasMore: true
				}],
				keepLive: []
			};
		},
		onLoad() {
			this.getData()
			this.keepLive.push(this.TabCur) //缓存
		},
		async onPullDownRefresh() {
			this.Tabs[this.TabCur].page = 1
			this.Tabs[this.TabCur].hasMore = true
			this.Tabs[this.TabCur].data = []
			await this.getData()
			uni.stopPullDownRefresh()
		},
		onReachBottom() { //触底加载更多
			if (!this.Tabs[this.TabCur].hasMore) return;
			this.Tabs[this.TabCur].page++
			this.getData()
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
			getData() {
				MEDIA_NAEARBYACTIVITY({
					pageNo: this.Tabs[this.TabCur].page,
					type: this.TabCur ? 3 : 2
				}).then(res => {
					if (res.status) {
						if (res.data.length < 20) {
							this.Tabs[this.TabCur].hasMore = false
						}
						this.Tabs[this.TabCur].data = this.Tabs[this.TabCur].data.concat(res.data)
					}
				})
			},
			handlerTap(id) { //关注
				USER_FOLLOW({
					anchorId: id
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
			},
			goDetail(id){
				this.navTo('/pages/discover/anchorDetail?id='+id)
			}
		},
		computed: {
			style() {
				//#ifdef APP-PLUS
				return `height:${45}px;top:0`;
				// #endif
				//#ifdef H5
				return `height:${45}px;top:${this.CustomBar}px`;
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		background-color: #242A37
	}
</style>
