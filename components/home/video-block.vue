<template>
	<view class="video-item radius">
		<view class="img">
			<image :src="cover" mode="aspectFill"></image>
			<text v-if="time" class="timer radius text-sm">{{timerTips}}</text>
		</view>
		<view class="detail flex padding-lr-xs align-center">
			<view class="cu-avatar round" :style="`background-image: url('${author}');`">
			</view>
			<view class="flex flex-direction content margin-left-xs">
				<view class="title text-cut text-sm">
					{{name}}
				</view>
				<view v-if="icon.length" class="icons">
					<text class="cuIcon-appreciate"></text>
					{{icon[0]}}
					<text class="cuIcon-unlock margin-left-lg"></text>
					{{icon[1]}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
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
			name: {
				type: String,
				default: '视频名称视频名称视频名称视频名称视频名称'
			},
			icon: { //第一个是点赞人数，第二个解锁人数
				type: Array,
				default: () => []
			}
		},
		data() {
			return {

			}
		},
		computed: {
			timerTips() {
				return this.formatTime(new Date(this.time), 'mm:ss')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-item,
	.anchor-item {
		width: calc((100% - 30upx)/2);
		height: 330upx;
		background-color: #303849;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		.img {
			height: 220upx;
			overflow: hidden;
			position: relative;

			.timer {
				position: absolute;
				background-color: rgba(25, 25, 25, 0.6);
				color: rgb(255, 255, 255);
				bottom: 12upx;
				right: 12upx;
				padding: 2px 4px;
			}
		}

		.detail {
			height: 110upx;

			.content {
				width: calc(100% - 10upx - 64upx);
				line-height: 1.6em;
			}
		}

		&.anchor-item {
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
