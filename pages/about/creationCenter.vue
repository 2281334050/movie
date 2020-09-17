<template>
	<view>
		<view class="bg-img flex align-center" style="background-image: url(../../static/smrz.png);height: 220upx">
		</view>
		<!-- 链接 -->
		<view class="margin-lr-sm cu-list grid col-4 no-border radius margin-top">
			<view class="cu-item">
				<view>
					<view class="cu-avatar radius" style="background-image: url(../../static/jryy.png);">
					</view>
				</view>
				<text>佳人有约</text>
			</view>
			<view class="cu-item">
				<view>
					<view class="cu-avatar radius" style="background-image: url(../../static/tjyl.png);">
					</view>
				</view>
				<text>推荐有礼</text>
			</view>
			<view class="cu-item">
				<view>
					<view class="cu-avatar radius" style="background-image: url(../../static/xfjl.png);">
					</view>
				</view>
				<text>消费记录</text>
			</view>
			<view class="cu-item">
				<view>
					<view class="cu-avatar radius" style="background-image: url(../../static/czzx.png);">
					</view>
				</view>
				<text>创作中心</text>
			</view>
		</view>
		<!-- 数据 -->
		<view class="cu-bar">
			<view class="action">
				<text>数据总览</text>
			</view>
			<view class="action">
				<text class="text-gray text-sm">每天十点更新</text>
			</view>
		</view>
		<view class="grid col-2 margin-lr-sm data-block radius">
			<view class="data-item flex padding-sm solid-bottom">
				<view class="cu-avatar" style="background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg);height: 120upx;width: 100upx;"></view>
				<view class="margin-left-sm data">
					<view>粉丝量</view>
					<view class="text-lg">2578</view>
					<view>
						<text class="text-sm">较昨日:100</text>
						<text class="cuIcon-pullup margin-left-xs"></text>
					</view>
				</view>
			</view>
			<view class="data-item flex padding-sm solid-bottom">
				<view class="cu-avatar" style="background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg);height: 120upx;width: 100upx;"></view>
				<view class="margin-left-sm data">
					<view>粉丝量</view>
					<view class="text-lg">2578</view>
					<view>
						<text class="text-sm">较昨日:100</text>
						<text class="cuIcon-pullup margin-left-xs"></text>
					</view>
				</view>
			</view>
			<view class="data-item flex padding-sm">
				<view class="cu-avatar" style="background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg);height: 120upx;width: 100upx;"></view>
				<view class="margin-left-sm data">
					<view>粉丝量</view>
					<view class="text-lg">2578</view>
					<view>
						<text class="text-sm">较昨日:100</text>
						<text class="cuIcon-pullup margin-left-xs"></text>
					</view>
				</view>
			</view>
			<view class="data-item flex padding-sm">
				<view class="cu-avatar" style="background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg);height: 120upx;width: 100upx;"></view>
				<view class="margin-left-sm data">
					<view>粉丝量</view>
					<view class="text-lg">2578</view>
					<view>
						<text class="text-sm">较昨日:100</text>
						<text class="cuIcon-pullup margin-left-xs"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 工具 -->
		<view class="cu-bar">
			<view class="action">
				<text>工具</text>
			</view>
		</view>
		<view class="flex margin-lr-xs tools">
			<view class="tools-item flex padding-sm flex-sub align-center margin-lr-xs radius">
				<view class="cu-avatar" style="background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg);height: 80upx;width: 80upx;"></view>
				<view class="margin-left-sm data">
					<view>主页设置</view>
					<view class="text-xs text-gray">个性主页获取更多关注</view>
				</view>
			</view>
			<view class="tools-item flex padding-sm flex-sub align-center margin-lr-xs radius">
				<view class="cu-avatar" style="background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg);height: 80upx;width: 80upx;"></view>
				<view class="margin-left-sm data">
					<view>请粉丝推广</view>
					<view class="text-xs text-gray">承诺解锁视频加更视频</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.data-block{
		background-color: #303849;
		.data-item {
			.data {
				line-height: 40upx;
			}
		}
	}
	.tools{
		.tools-item{
			background-color: #303849;
		}
	}

	.cu-list {
		&.grid {
			background-color: #303849;

			&.no-border {
				padding: 10upx;

				>.cu-item {
					padding: 20upx 0 10upx 0;
				}
			}

			.cu-item {
				.cu-avatar {
					height: 82upx;
					width: 82upx;
				}

				uni-text {
					color: #fff;
					font-size: 24upx;
				}
			}
		}
	}
</style>
