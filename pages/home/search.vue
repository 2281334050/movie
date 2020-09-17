<template>
	<view>
		<view :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar search xl fixed header" :style="style">
				<view class="search-form round">
					<text class="cuIcon-search text-gray" style="font-size: 16px;"></text>
					<input :adjust-position="false" type="text" class="text-white" placeholder="搜索您喜欢的内容或博主" confirm-type="搜索"></input>
				</view>
				<view @tap="goBack" class="action">
					<text class="cuIcon-close"></text>
					<text>取消</text>
				</view>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="cu-bar">
			<view class="action">
				搜索历史
			</view>
		</view>
		<view class="flex padding-lr-sm history" style="flex-wrap: wrap;">
			<view class="history-item margin-left-xs margin-bottom-xs radius text-center text-sm" v-for="i in 10">
				<text class="text-gray">搜索的内容{{i}}</text>
			</view>
		</view>
		<!-- 推荐搜索 -->
		<view class="cu-bar">
			<view class="action">
				推荐搜索
			</view>
		</view>
		<view class="flex padding-lr-sm history" style="flex-wrap: wrap;">
			<view class="history-item margin-left-xs margin-bottom-xs radius text-center text-sm" v-for="i in 10">
				<text class="text-gray">#标签{{i}}</text>
			</view>
		</view>
		<!-- tab筛选 -->
		<view >
			<scroll-view scroll-x class="nav solid-bottom" :style="style">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-yellow cur':''" v-for="(item,index) in Tabs" :key="index"
					 @tap="tabSelect" :data-id="index">
						{{item.label}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- tab筛选内容 -->
		<view class="content padding-lr-sm flex flex-wrap">
			<videoItem class="margin-left-xs margin-top-xs" v-for="i in 6" :icon="[666,666]" :time="60000"></videoItem>
		</view>
	</view>
</template>

<script>
	import videoItem from "@/components/home/video-block.vue"
	export default {
		components: {
			videoItem
		},
		data() {
			return {
				TabCur: 0,
				Tabs: [{
					label: '解锁榜'
				}, {
					label: '主播榜'
				}, {
					label: '新人榜'
				}, {
					label: '热门标签'
				}],
			};
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id * 1;
			},
		},
		computed:{
			style() {
				return `height:${this.CustomBar}px;padding-top:${this.StatusBar}px;`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-form {
		background: #313642;
		color: #aaaaaa;
		line-height: 40px;
		height: 40px;
		;
	}

	.history {
		.history-item {
			width: calc((100% - 50upx)/4);
			line-height: 50upx;
			height: 50upx;
			background-color: #313642;
		}
	}
	.header{
		background-color: #242A37
	}
</style>
