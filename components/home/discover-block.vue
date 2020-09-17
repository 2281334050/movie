<template>
	<view>
		<!-- 动态模块 -->
		<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view @tap="$emit('goDetail')" class="cu-avatar round lg" :style="`background-image:url(${avatar});`"></view>
						<view class="content flex-sub" @tap="$emit('goDetail')">
							<view>{{name}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{date}}
							</view>
						</view>
						<view>
							<button v-if="btnText" class="bg-yellow cu-btn sm margin-right" @tap="$emit('handlerTap')">{{btnText}}</button>
						</view>
					</view>
				</view>
				<view class="text-content">
					{{text}}
				</view>
				<view :class="['grid padding-lr padding-bottom-sm pad col-3',{'grid-square':list.length>1}] ">
					<!-- 图片 -->
					<block v-if="type*1===2">
						<!-- 						<view v-for="(item,key) in list" :key="key" :class="['bg-img',{'only-img':list.length === 1}]">
							<image :src="item" mode=""></image>
						</view> -->
						<view v-for="(item,key) in list" :key="key" :class="['bg-img',{'only-img':list.length === 1}]" @tap="ViewImage"
						 :style="`background-image:url('${item}');`" :data-url="item"></view>
					</block>
					<block v-else>
						<video :src="list[0]" class="only-img"></video>
					</block>
				</view>
				<view v-if="icons.length" class="text-gray flex justify-around">
					<view class="handler-btn text-center">
						<text class="cuIcon-appreciatefill margin-right-xs"></text>
						{{icons[0]}}
					</view>
					<view class="handler-btn text-center">
						<text class="cuIcon-videofill margin-right-xs"></text>
						{{icons[1]}}
					</view>
					<view class="handler-btn text-center">
						<text class="cuIcon-unlock margin-right-xs"></text>
						{{icons[2]}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/*
		动态模块
	*/
	export default {
		props: {
			avatar: {
				type: String,
				default: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
			},
			name: {
				type: String,
				default: '江晚吟'
			},
			type: {
				type: [String, Number],
				default: 2
			},
			date: {
				type: [Number, String],
				default: '2019年12月3日'
			},
			text: {
				type: String,
				default: '动态默认站位符动态默认站位符动态默认站位符动态默认站位符动态默认站位符动态默认站位符'
			},
			icons: {
				type: Array,
				default: () => [] //依次是点赞数，播放数，解锁数
			},
			list: {
				type: Array,
				default: () => [] //媒体数组
			},
			btnText: {
				type: String,
				default: ''
			},
			handlerTap: {
				type: Function
			},
			goDetail: {
				type: Function
			}
		},
		data() {
			return {

			};
		},
		methods: {
			ViewImage(e) {
				uni.previewImage({
					urls: this.list,
					current: e.currentTarget.dataset.url
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.menu-avatar {
		.cu-item {
			background-color: #303849;

			&::after {
				border: 0;
			}

			.content.flex-sub {
				width: calc(100% - 96upx - 180upx - 20upx);
			}
		}
	}

	.handler-btn {
		width: calc(100% / 3);
		line-height: 60upx;

		[class*="cuIcon-"] {
			font-size: 32upx;
		}
	}

	.cu-card {
		&.dynamic {
			>.cu-item {
				background-color: #303849;
			}
		}
	}
</style>
