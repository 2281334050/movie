<template>
	<view>
		<!-- 限时免费 -->
		<view class="cu-bar search xl">
			<view class="search-form round">
				<text class="cuIcon-search" style="font-size: 32upx"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
		</view>
		<!-- links -->
		<view class="links cu-bar">
			<view class="btn margin-left">高颜值</view>
			<view class="btn">新主播</view>
			<view class="btn">长视频</view>
			<view class="btn">新主播</view>
			<view class="action">
				<view class="cu-tag radius sm bg-yellow">更多</view>
			</view>
		</view>
		<!-- 轮播 -->
		<view class="swiper-box margin-lr">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 duration="500" style="height: 280upx;">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
		</view>
		<!-- 限时免费 -->
		<view class="cu-bar">
			<view class="action">
				<text>限时免费</text>
			</view>
		</view>
		<view class="padding-lr-sm videos flex flex-wrap">
			<block v-for="(item,key) in videos">
				<videoItem class="margin-left-xs margin-top-xs" :key="key"  :icon="[66,item.views]" :cover="item.coverUri" :time="60000" :name="item.videoTitle"></videoItem>
			</block>
		</view>
	</view>
</template>

<script>
	import videoItem from "@/components/home/video-block.vue"
	export default {
		components: {
			videoItem
		},
		props:{
			videos:{
				type:Array,
				default:()=>[]
			},
			banner:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}]
			};
		},
	}
</script>

<style lang="scss" scoped>
 .screen-swiper {
 	min-height: unset;
 }
 
 .swiper-box {
 	border-radius: 10upx;
 	overflow: hidden;
 }
 
 .search-form {
 	background: #313642;
 	color: #aaaaaa;
 	line-height: 80upx;
 	height: 80upx;
 }
</style>
