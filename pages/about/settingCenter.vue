<template>
	<view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<text class="text-white text-lg text-bold">个人资料</text>
				</view>
			</view>
			<view class="cu-item ">
				<view class="content padding-tb-sm">
					<text class="text-white text-lg text-bold">隐私保护</text>
					<view class="text-gray text-sm">
						关闭后，所有人不可进入您的主页
					</view>
				</view>
				<view class="action">
					<switch class="yellow" @change="SwitchSex" :class="skin?'checked':''" :checked="skin?true:false"></switch>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<text class="text-white text-lg text-bold">修改密码</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<text class="text-white text-lg text-bold">黑名单</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<text class="text-white text-lg text-bold">联系客服</text>
				</view>
			</view>
		</view>
		<view class="padding-lr margin-top">
			<button class="cu-btn bg-red xl block radius text-bold">退出账号</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				skin:true
			};
		},
		methods:{
			SwitchSex(e){
				this.skin = e.detail.value
			}
		},
		onLoad() {
			this.checkPower(1)
		}
	}
</script>

<style lang="scss" scoped>
	.cu-list {
		&.menu {
			>.cu-item {
				background-color: transparent;
				min-height: 114upx;

				&::after {
					left: 30upx;
					width: 200%;
					border-color: rgba($color: #fff, $alpha: .1);
				}

				.content {}
			}
		}
	}
</style>
