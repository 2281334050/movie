<template>
	<view>
		<cu-custom leftSlot>
			<view slot="left">
				<text class="cuIcon-homefill margin-right-sm" style="font-size: 1.5em;"></text>
				<!-- <text class="text-lg">我的主页</text> -->
			</view>
			<view slot="right">
				<text @tap="navTo('settingCenter')" class="cuIcon-settingsfill" style="font-size: 1.5em;"></text>
			</view>
		</cu-custom>
		<view class="cu-list menu-avatar">
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
				<view class="action">
					<text class="cuIcon-right" style="font-size: 1.5em;"></text>
				</view>
			</view>
		</view>
		<view class="margin-top flex vip-block">
			<view class="margin-left tobeVip radius flex align-center padding-lr-xs">
				<img src="../../static/diamond.png" alt="" class="margin-left-sm">
				<text class="text-yellow text-bold margin-left-lg" style="font-size: 1.2em;">成为会员</text>
				<text class="cuIcon-right" style="font-size: 1.2em;"></text>
			</view>
			<view class="qiandao text-center">
				<img class="margin-right-xs" src="../../static/diamond.png" alt="">
				<text class="text-yellow text-bold text-lg ">+30</text>
			</view>
		</view>
		<view class="margin-top flex margin-lr-sm radius money padding-tb-sm">
			<view class="left solid-right flex align-center">
				<img src="../../static/diamond.png" class="margin-left padding-left" alt="">
				<view class="text-center margin-left">
					<view class="text-xxl text-bold">2000</view>
					<view class="text-bold">钻石余额</view>
				</view>
			</view>
			<view class="right flex align-center justify-center">
				<text class="text-bold text-xl">我要充值</text>
				<text class="cuIcon-right margin-left-sm" style="font-size: 1.2em;"></text>
			</view>
		</view>
		<view class="cu-list grid col-4 no-border">
			<view class="cu-item" v-for="(item,key) in link1" :key="key" @tap="Golink1(item.url)">
				<view>
					<img :src="item.icon" alt="">
				</view>
				<text>
					{{item.name}}
				</text>
			</view>
		</view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" v-for="(item,key) in link2" :key="key">
				<view class="content">
					<image :src="item.icon" class="png" mode="aspectFit"></image>
					<text class="text-white text-lg text-bold">{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				link1:[
					{
						icon:'../../static/wdyy.png',
						name:'我的预约',
						url:''
					},
					{
						icon:'../../static/wdjs.png',
						name:'我的解锁',
						url:'/pages/about/videoLists'
					},
					{
						icon:'../../static/wdsc.png',
						name:'我的收藏',
						url:'/pages/about/videoLists?type=1'
					},
					{
						icon:'../../static/wddz.png',
						name:'我的点赞',
						url:'/pages/about/videoLists?type=2'
					}
				],
				link2:[
					{
						icon:'../../static/zbrz.png',
						name:'主播入驻',
						url:''
					},
					{
						icon:'../../static/wdqb.png',
						name:'我的钱包',
						url:''
					},
					{
						icon:'../../static/yqhy.png',
						name:'邀请好友',
						url:''
					},
					{
						icon:'../../static/dhm.png',
						name:'兑换码',
						url:''
					}
				]
			}
		},
		methods:{
			Golink1(url){
				if(url){
					this.navTo(url)
				}else{
					uni.showToast({
						title:'暂未开放',
						mask:true,
						icon:'none'
					})
					return;
				}
			}
		},
		onLoad() {
			this.checkPower(0) //传入参数，使登录后传回
		}
	}
</script>

<style scoped lang="scss">
	.cu-list.menu-avatar>.cu-item {
		background-color: transparent;
		height: 150upx;

		.content {
			width: calc(100% - 64px - 30px - 60px - 10px);
			left: 100px;
		}

		&::after {
			border: 0;
		}
	}
	.cu-list{
		&.grid{
			background-color: transparent;
			.cu-item{
				img{
					height: 60upx;
					vertical-align: middle;
					width: auto;
				}
				text{
					color: #fff;
				}
			}
		}
		&.menu{
			>.cu-item{
				background-color: transparent;
				min-height: 114upx;
				&::after{
					left: 0;
					width: 200%;
					border-color: rgba($color: #fff, $alpha: .1);
				}
				.content{
					image{
						width: 1.8em;
						height: 1.8em;
						margin-right:40upx
					}
				}
			}
		}
	}

	.vip-block {
		.tobeVip {
			line-height: 80upx;
			background-color: #212835;
			border: 1upx solid #2E384B;
			width: 490upx;
			.cuIcon-right{
				margin-left: auto;
			}

		}

		.qiandao {
			margin-left: auto;
			line-height: 80upx;
			width: 200upx;
			border-radius: 40upx 0 0 40upx;
			border: 1upx solid #2E384B;
		}

		img {
			width: 45upx;
			height: auto;
			vertical-align: middle;
		}
	}
	.money{
		height:140upx;
		background-color: #2E384B;
		img {
			width: 45upx;
			height: auto;
			vertical-align: middle;
		}
		.left{
			width: 414upx;
			&.solid-right{
				&::after{
					border-color: rgba(255,255,255,.3);
				}
			}
			
		}
		.right{
			flex: 1;
		}
	}
</style>
