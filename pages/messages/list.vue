<template>
	<view>
		<view class="messages">
			<view class="cu-list menu-avatar">
				<view class="cu-item solid-top">
					<view class="cu-avatar radius lg" style="background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);">
						<view class="cu-tag badge">99+</view>
					</view>
					<view class="content">
						<view class="text-grey">主播姓名
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								接收到的最新消息，超出部分省略号显示站位站位
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-gray text-xs">下午1:35</view>
						<view class="cuIcon-notice_forbid_fill text-gray" style="visibility: hidden;"></view>
					</view>
				</view>
				<view class="cu-item solid-top">
					<view class="cu-avatar radius lg" style="background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
					<view class="content">
						<view class="text-grey">主播姓名</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<!-- <text class="cuIcon-infofill text-red  margin-right-xs"></text> -->
								[图片]
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-gray text-xs">下午2:35</view>
						<view class="cuIcon-notice_forbid_fill text-gray" style="visibility: hidden;"></view>
					</view>
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
		},
		onLoad() {
			console.log(this.navTo)
		}
	}
</script>

<style lang="scss" scoped>
	.add-btn {
		position: fixed;
		bottom: 60px;
		right: 12px;
		z-index: 10;
		cursor: pointer;
		animation: 0.6s ease 0s 1 normal forwards running none;
	}

	.messages {
		.cu-list.menu-avatar>.cu-item {
			background-color: #191919;

			&::after {
				border-color: #000;
			}
		}
	}
</style>
