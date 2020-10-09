<template>
	<view>
		<!-- vip精选 -->
<!-- 		<view class="top-banner">
			<view class="bg-mask bg-img">
				<swiper class="screen-swiper" :circular="true" :autoplay="true" interval="5000" duration="500" style="height: 450upx;">
					<swiper-item v-for="(item,index) in banner" :key="index">
						<image :src="item.image" mode="aspectFill" ></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</swiper-item>
				</swiper>
			</view>

			<view class="vip-detail radius margin-lr">
				
			</view>
		</view> -->
		<!-- vip精选 -->
<!-- 		<view class="cu-bar">
			<view class="action">
				<text>vip精选</text>
			</view>
			<view class="action" @tap="navTo('/pages/about/videoLists?type=5')">
				<view class="cu-tag radius sm bg-yellow">更多</view>
			</view>
		</view> -->
		<view class="padding-lr-sm videos flex flex-wrap">
			<block v-for="(item,key) in videos">
				<videoItem @videoTap="goDetail(item,0)" @authorTap="goDetail(item,1)" class="margin-left-xs margin-top-xs" :key="key"  :icon="[66,item.views]" :cover="item.coverUri" :time="60000" :name="item.videoTitle"></videoItem>
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

			};
		},
		methods:{
			goDetail(item,type){
				console.log(item,type)
				if(!type){//视频详情跳转
					this.navTo(`/pages/home/videoDetail?id=${item.id}&uid=${item.publishId}`)
				}else if(type === 1){//作者详情跳转
					this.navTo(`/pages/discover/anchorDetail?id=${item.publishId}`)
				}else if(type === 2){//作者详情跳转
					this.navTo(`/pages/discover/anchorDetail?id=${item.id}`)
				}
			}
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
