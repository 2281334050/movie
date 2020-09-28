<template>
	<view>
		<form>
			<!-- 用户名 -->
			<view class="cu-form-group margin-top-sm text-left">
				<!-- <input class="solid-bottom padding-left-sm padding-bottom-xs" v-model="modalType==1?nickName:this.modalType==2?selfDescription:Homepage" focus='true' maxlength="8"
				 :placeholder=""></input> -->
				<input v-if="type==1" class="solid-bottom padding-left-sm padding-bottom-xs" v-model='nickname'
				 placeholder="请输入您的新昵称" type="text">
				<input v-else-if="type==2" class="solid-bottom padding-left-sm padding-bottom-xs" v-model='selfDescription'
				 placeholder="心有猛虎,细嗅蔷薇" type="text">
				<input v-else-if="type==3" class="solid-bottom padding-left-sm padding-bottom-xs" v-model='Homepage'
				 placeholder="这个人很懒,什么都没留下" type="text">
			</view>
			<view v-if="type==1" class='margin-lr-xl margin-top-xs text-left text-gray text-sm'>好名字可以让你的朋友跟容易记住你</view>
		</form>
		<view class="margin-lr-sm margin-top-xl flex">
			<view class="cu-btn lg block flex-sub bg-gray radius margin-lr-sm">
				<view class="action margin-0   solid-left">确认修改</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type:"1",
				nickname:"",
				selfDescription:"",
				Homepage:""
			}
		},
		methods:{},
		onLoad(option) {
			this.type=option.type
			switch(option.type){
				case '1':
				uni.setNavigationBarTitle({
				    title: '修改昵称'
				});
				break;
				case '2':
				uni.setNavigationBarTitle({
				    title: '修改签名'
				});
				break;
				case '3':
				uni.setNavigationBarTitle({
				    title: '修改主页说明'
				});
				break;
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
