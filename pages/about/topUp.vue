<template>
	<view>
		<!-- 头部 -->
		<view class="cu-list menu-avatar padding-top">
			<view class="cu-item">
				<view class="cu-avatar round xl" :style="`background-image:url(${$store.state.UserInfo.avatar}); border:1upx solid #fff;`"></view>
				<view class="content">
					<view class="text-white" style="font-size: 1.5em;">{{$store.state.UserInfo.nickname}}</view>
					<view class="text-gray text-sm flex margin-top-xs">
						<view class="text-cut" style="font-size: 1.3em;">
							UID: <text class="text-yellow"> 258000065</text>
						</view>
					</view>
				</view>
				<view class="margin-right padding-tb-xs padding-lr-sm text-sm radius other">
					为他人充值
				</view>
			</view>
		</view>
		<!-- 支付方式 -->
		<view class='margin-top-lg'>
			<view class='margin-lr-sm margin-bottom-sm text-df'>支付方式</view>
			<view class='margin-lr-sm  flex justify-between radius topUpList'>
				<view v-for='item in 3' class='item radius flex flex-direction align-center justify-center ' :class="item==1?'active':''">
					<img class='img' src="../../static/wdyy.png" alt=""></img>
					<text class='text-xs margin-top-sm'>微信支付</text>
				</view>
			</view>
		</view>
		<!-- 充值金额 -->
		<view class="margin-top-lg">
			<view class="margin-lr-sm margin-bottom-sm text-df">充值金额</view>
			<view class="margin-lr-sm  flex justify-start flex-wrap radius topUpDetail">
				<view v-for='item in 6' class='item radius flex flex-direction align-center justify-center ' :class="item==1?'active':''">
					<view class='flex'>
						<img class='img' src="../../static/wdyy.png" alt=""></img>
						<text class='margin-left-xs'>2000</text>
					</view>
					<text class='text-sm margin-top-sm'>20元</text>
				</view>
			</view>
			<view class='margin-lr-sm margin-top-xxl'>
				<view class='submit cu-btn block lg radius text-black text-bold'>立即支付</view>
			</view>
			<view style='height:50px'></view>
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
	.cu-list.menu-avatar>.cu-item {
		background-color: transparent;
		height: 150upx;

		.content {
			width: calc(100% - 64px - 30px - 60px - 10px - 40px);
			left: 200upx;
		}

		&::after {
			border: 0;
		}

		.other {
			background: rgba(28, 33, 43, 1)
		}
	}

	.topUpList {
		background: rgba(48, 56, 73, 1);
		height: 192upx;

		.item {
			width: 200upx;

			.img {
				width: 86upx;
				height: 90upx;
				vertical-align: middle;
			}

			&.active {
				background: rgba(28, 33, 43, 1);
			}
		}

		// .active{
		// 	background: rgba(28,33,43,1);
		// }
	}

	.topUpDetail {
		height: 286upx;

		.item {
			width: 31%;
			margin: 6upx;
			height: 143upx;
			background: rgba(48, 56, 73, 1);

			.img {
				width: 35upx;
				height: 32upx;
				vertical-align: middle;
			}

			&.active {
				background: rgba(28, 33, 43, 1);
			}
		}
	}

	.submit {
		background: rgba(252, 170, 31, 1);
	}
</style>
