<template>
	<view>
		<!-- 推荐 -->
<!-- 		<view class="cu-bar search xl">
			<view class="search-form round">
				<text class="cuIcon-search" style="font-size: 32upx"></text>
				<input disabled type="text" @tap="navTo('search')" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
		</view> -->
		<!-- links -->
<!-- 		<view class="links cu-bar">
			<view class="btn margin-left">高颜值</view>
			<view class="btn">新主播</view>
			<view class="btn">长视频</view>
			<view class="btn">新主播</view>
			<view class="action">
				<view class="cu-tag radius sm bg-yellow">更多</view>
			</view>
		</view> -->
		<!-- 轮播 -->
		<view class="swiper-box margin-lr margin-top-sm">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 duration="500" style="height: 360upx">
				<swiper-item v-for="(item,index) in banner" :key="index" @tap="goDetail">
					<image :src="item.image" mode="aspectFill"></image>
					<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
				</swiper-item>
			</swiper>
		</view>
		<!-- 猜你喜欢 -->
		<view class="cu-bar">
			<view class="action">
				<text>猜你喜欢</text>
			</view>
			<view class="action" @tap="changeYoulike">
				<view class="cu-tag radius sm bg-yellow">换一批</view>
			</view>
		</view>
		<view class="padding-lr-sm videos flex flex-wrap">
			<block v-for="(item,key) in youLike">
				<videoItem @videoTap="goDetail(item,0)" @authorTap="goDetail(item,1)" class="margin-left-xs margin-top-xs" v-if="key<=3" :key="key"  :icon="[item.likes,item.views]" :cover="item.coverUri" :time="item.duration" :name="item.videoTitle" :author="item.publishAvatar"></videoItem>
			</block>
		</view>
		<!-- 轮播 -->
		<view class="cu-bar">
			<view class="action">
				<text>热门解锁</text>
			</view>
			<view class="action" @tap="navTo('/pages/about/videoLists?type=3')">
				<view class="cu-tag radius sm bg-yellow">更多</view>
			</view>
		</view>
		<view class="swiper-box margin-lr">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 duration="500" style="height: 280upx;">
				<swiper-item v-for="(item,index) in hot" :key="index" @tap="goDetail(item,0)">
					<image :src="item.coverUri" mode="aspectFill"></image>
<!-- 					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
				</swiper-item>
			</swiper>
		</view>
		<!-- 官方精选 -->
		<view class="cu-bar">
			<view class="action">
				<text>官方精选</text>
			</view>
			<view class="action" @tap="navTo('/pages/about/videoLists?type=4')">
				<view class="cu-tag radius sm bg-yellow">更多</view>
			</view>
		</view>
		<view class="padding-lr-sm">
			<scroll-view class="scroll-view_H videos" scroll-x="true" style="height: 330upx">
				<videoItem @videoTap="goDetail(item,0)" @authorTap="goDetail(item,1)" class="margin-left-xs" style="display: inline-block;" v-for="(item,key) in featured" :key="key"  :icon="[item.likes,item.views]"  :cover="item.coverUri" :time="item.duration" :author="item.publishAvatar" :name="item.videoTitle"></videoItem>
			</scroll-view>
		</view>
		<!-- 新近主播 -->
		<view class="cu-bar">
			<view class="action">
				<text>新晋主播</text>
			</view>
			<view class="action">
				<view class="cu-tag radius sm bg-yellow">更多</view>
			</view>
		</view>
		<view class="padding-lr-sm">
			<scroll-view class="scroll-view_H anchors" scroll-x="true" style="height: 420upx">
				<videoItem class="anchor-item radius margin-left-xs" style="display: inline-block;" v-for="item in anchors" :key="item.id" :cover="item.avatar" :name="item.nickname" @videoTap="goDetail(item,2)" @authorTap="goDetail(item,2)"></videoItem>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import videoItem from "@/components/home/video-block.vue"
	import {
		MEDIA_GETINDEXVIDEO
	} from "@/common/requestApi"
	export default {
		components: {
			videoItem
		},
		props:{
			youlike:{
				type:Array,
				default:()=>[]
			},
			hot:{
				type:Array,
				default:()=>[]
			},
			featured:{
				type:Array,
				default:()=>[]
			},
			anchors:{
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
				youLike:[]
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
			},
			changeYoulike(){
				uni.showLoading()
				MEDIA_GETINDEXVIDEO({pageNo:1,type:0}).then(res=>{
					uni.hideLoading()
					if(res.status){
						this.youLike = res.data
					}else{
						uni.showToast({
							title:res.msg,
							mask:true,
							icon:'none'
						})
					}
				})
			}
		},
		watch:{
			youlike:function(val){
				this.youLike = val
			}
		}
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

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.anchors {
		.anchor-item {
			width: calc((100% - 45upx)/3);
			height: 420upx;

			.detail {
				height: 90upx;
			}

			.img {
				height: 330upx;
			}
		}
	}
</style>
