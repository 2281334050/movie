<template>
	<view>
		<!-- 发现 -->
		<view style="height: 44px;">
			<scroll-view scroll-x class="nav solid-bottom fixed header" :style="style">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-yellow cur':''" v-for="(item,index) in Tabs" :key="index"
					 @tap="tabSelect" :data-id="index">
						{{item.label}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 系统 -->
		<view v-if="TabCur === 0">
			<view class="messages">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);">

						</view>
						<view class="content">
							<view class="text-grey">系统消息
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
				</view>
			</view>
		</view>
		<!-- 聊天 -->
		<view v-else="TabCur === 1">
			<view class="messages">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
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
					<view class="cu-item">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 1,
				Tabs: [{
					label: '系统'
				}, {
					label: '聊天'
				}]
			};
		},
		onLoad() {
			this.checkPower(0) //传入参数，使登录后传回
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id * 1;
			}
		},
		computed: {
			style() {
				//#ifdef APP-PLUS
				return `height:${45}px;top:0`;
				// #endif
				//#ifdef H5
				return `height:${45}px;top:${this.CustomBar}px`;
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		background-color: #242A37
	}

	.messages {
		.cu-list.menu-avatar>.cu-item {
			background-color: #303849;

			&::after {
				border-color: #242A37;
			}
		}
	}
</style>
