<template>
	<view>
		<view class="video-box">
			<video class="video fixed" src="https://skyline-s3.s3-ap-northeast-1.amazonaws.com/yoyo.mp4" controls :style="{top:CustomBar+'px'}"></video>
		</view>
		<view class="video-detail">
			<view class="cu-bar text-gray">
				<view class="action">
					<text class="cuIcon-appreciate"></text>
					11
					<text class="cuIcon-unlock margin-left-lg"></text>
					22
				</view>
				<view class="action">
					2020-05-08
				</view>
			</view>
			<view class="cu-bar">
				<view class="action text-bold">视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题</view>
			</view>
			<view class="cu-bar margin-top padding-bottom-sm solid-bottom-xl">
				<view class="action">
					<view class="flex flex-direction text-center">
						<text class="cuIcon-like" style="font-size: 20px;"></text>
						<text class="text-sm">喜欢</text>
					</view>
					<view class="flex flex-direction text-center margin-left">
						<text class="cuIcon-appreciate" style="font-size: 20px;"></text>
						<text class="text-sm">点赞</text>
					</view>
				</view>
				<view class="action">
					<button class="cu-btn line-yellow">立即加入观看</button>
				</view>
			</view>
		</view>
		<view class="anchor">
			<view class="cu-bar margin-top">
				<view class="action">
					<view class="cu-avatar round lg" style="background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg);">
					</view>
					<view class="name flex flex-direction margin-left-sm">
						<text class="text-lg text-bold">主播名称</text>
						<!-- 	<text class="text-gray">1222</text> -->
					</view>
				</view>
				<view class="action">
					<button class="cu-btn line-yellow">关注</button>
					<button class="cu-btn line-yellow margin-left-sm">私信</button>
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
		</view>
	</view>
</template>

<script>
	import {
		USER_GETMEDIADETAIL
	} from "@/common/requestApi"
	export default {
		data() {
			return {
				TabCur: 0,
				Tabs: [{
					label: '更多他的视频'
				}, {
					label: '推荐视频'
				}],
				id: null
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id * 1;
			},
			getDetail() {
				USER_GETMEDIADETAIL({
					id: this.id,
					mediaType: 1
				}).then(res => {
					console.log(res)
				})
			}
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id * 1
				this.getDetail()
			} else {
				return
			}
		},
		computed: {

		}
	}
</script>

<style lang="scss" scoped>
	.fixed {
		position: fixed;
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
