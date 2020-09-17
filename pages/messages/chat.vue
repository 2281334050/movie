<template>
	<view class="chart-window">
		<view class="cu-chat">
			<view class="cu-item self">
				<view class="main">
					<view class="content bg-green shadow">
						<text>喵喵喵！喵喵喵！喵喵喵！喵喵！喵喵！！喵！喵喵喵！</text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">2018年3月23日 13:23</view>
			</view>
			<view class="cu-info round">对方撤回一条消息!</view>
			<view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						<text>喵喵喵！喵喵喵！</text>
					</view>
				</view>
				<view class="date "> 13:23</view>
			</view>
			<view class="cu-info">
				<text class="cuIcon-roundclosefill text-red "></text> 对方拒绝了你的消息
			</view>
			<view class="cu-info">
				对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
				<text class="text-blue">发送好友验证</text>
			</view>
			<view class="cu-item self">
				<view class="main">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date"> 13:23</view>
			</view>
			<view class="cu-item self">
				<view class="main">
					<view class="action text-bold text-grey">
						3"
					</view>
					<view class="content shadow" @tap="playSound">
						<text class="cuIcon-sound padding-right-xl" style="font-size: 44upx;"> </text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view>
			<view class="cu-item self">
				<view class="main">
					<view class="action">
						<text class="cuIcon-locationfill text-orange text-xxl"></text>
					</view>
					<view class="content shadow">
						喵星球，喵喵市
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view>
			<view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						@#$^&**
					</view>
					<view class="action text-grey">
						<text class="cuIcon-warnfill text-red text-xxl"></text> <text class="text-sm margin-left-sm">翻译错误</text>
					</view>
				</view>
				<view class="date">13:23</view>
			</view>
		</view>

		<view class="cu-bar foot input handler-bottom" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text v-if="textMode" class="cuIcon-sound text-orange" @tap="changeMode(false)"></text>
				<text v-else class="cuIcon-keyboard text-orange" @tap="changeMode(true)"></text>
			</view>
			<view v-show="textMode" class="radius bg-grey">
				<input :confirm-hold="true" confirm-type="发送" @confirm="sendMsg" :adjust-position="false" :focus="inputFocus" maxlength="300" cursor-spacing="10" @focus="InputFocus" @blur="InputBlur"></input>
			</view>
			<view v-show="!textMode" :class="['radius  touch-speak',speaking?'bg-gray':'bg-grey']" @touchstart="startSpeak"
			 @touchend="endSpeak">
				<input type="text" value="按住说话" class="text-center" style="visibility: hidden;" disabled />
				<view class="text-box text-center">
					按住说话
				</view>
			</view>
			<view class="action">
				<text class="cuIcon-goodsfill text-orange"></text>
			</view>
			<button class="cu-btn bg-orange shadow">发送</button>
		</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				InputBottom: 0,
				textMode: true,
				inputFocus: false,
				speaking: false, //语音录入中,
				voicePath: ''
			};
		},
		onLoad() {
			recorderManager.onStop((res) => {
				console.log('录音停止' + JSON.stringify(res));
				this.voicePath = res.tempFilePath;
			});
		},
		methods: {
			InputFocus(e) {
				console.log(e)
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			changeMode(val) {
				//#ifdef APP-PLUS
				this.textMode = val
				//#endif
			},
			startSpeak() {
				console.log('按下')
				this.speaking = true
				recorderManager.start();

			},
			endSpeak() {
				console.log('停止')
				this.speaking = false
				recorderManager.stop();
			},
			playSound(){
				console.log(this.voicePath)
				innerAudioContext.src = this.voicePath
				innerAudioContext.play()
			},
			sendMsg(e){
				if(e.detail.value.trim()){
					
				}else{
					uni.showModal({
						content:'不能发送空白消息',
						showCancel:false,
						success:(res)=>{
							uni.hideKeyboard()
							this.InputBlur()
						}
					})
				}
			}
		},
		watch: {
			textMode(val) {
				this.inputFocus = val
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chart-window {
		padding-bottom: 100upx;

		.handler-bottom {
			background-color: #191919;

			.touch-speak {
				position: relative;

				.text-box {
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					line-height: 64upx;
				}
			}
		}
	}
</style>
