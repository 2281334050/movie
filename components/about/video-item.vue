<template>
	<view class="video-item flex padding-sm solid-top">
		<view class="img radius">
			<image :src="cover" mode=""></image>
		</view>
		<view class="margin-left-sm detail">
			<view class="title">
				{{name}}
			</view>
			<view class="anchor margin-top-sm">
				<view class="cu-avatar round sm" :style="`background-image:url(${author}); border:1upx solid #fff;`"></view>
				<text class="text-gray margin-left-sm">{{authorName}}</text>
			</view>
			<view class="icons margin-top-sm text-gray">
				<text class="cuIcon-unlock"></text>
				<text>{{icon[0]}}</text>
				<text class="cuIcon-likefill margin-left-sm"></text>
				<text>{{icon[1]}}</text>
				<text class="cuIcon-appreciatefill margin-left-sm"></text>
				<text>{{icon[2]}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'video-item',
		props:{
			time: {
				type: Number,
				default: 0
			},
			cover: {
				type: String,
				default: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
			},
			author: {
				type: String,
				default: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"
			},
			authorName:{
				type:String,
				default:'一个小萌新'
			},
			name: {
				type: String,
				default: '视频名称视频名称视频名称视频名称视频名称'
			},
			icon: { //第一个是点赞人数，第二个解锁人数
				type: Array,
				default: () => []
			}
		}
	}
</script>

<style scoped lang="scss">
	.video-item {
		&.solid-top{
			&::after{
				border-color: rgba($color: #fff, $alpha: .1);
			}
		}
		.img {
			width: 350upx;
			height: 200upx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.detail{
			flex: 1;
			.title {
				font-weight: 400;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				line-height: 40upx;
				height: 80upx;
				overflow-y: hidden;
				word-break: break-all;
			}
		}
	
	}
</style>
