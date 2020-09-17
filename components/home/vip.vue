<template>
	<view>
		<!-- vip精选 -->
		<view class="top-banner">
			<view class="bg-mask bg-img">
				<swiper class="screen-swiper" :circular="true" :autoplay="true" interval="5000" duration="500" style="height: 450upx;">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</swiper-item>
				</swiper>
			</view>
			<!-- vip面板 -->
			<view class="vip-detail radius margin-lr">
				
			</view>
		</view>
		<!-- vip精选 -->
		<view class="cu-bar">
			<view class="action">
				<text>vip精选</text>
			</view>
			<view class="action">
				<view class="cu-tag radius sm bg-yellow">更多</view>
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
		}
	}
</script>

<style lang="scss" scoped>
	.top-banner{
		position: relative;
		height: 570upx;
		.bg-img{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 450upx;
		}
		.vip-detail {
			background: #303849;
			height: 240upx;
			position: absolute;
			width: calc(100% - 60upx);
			top:330upx ;
			z-index: 1;
		}
	}

</style>
