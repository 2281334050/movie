<template>
	<view>
	{{detail.content}}
	</view>
</template>

<script>
	import {
		MESSAGE_GETMESSAGEDETAIL
	} from "@/common/requestApi"
	export default {
		data() {
			return {
				detail: {}
			};
		},
		onLoad(options) {
			if (!options.id) {
				return false;
			}
			uni.showLoading({
				mask: true
			})
			MESSAGE_GETMESSAGEDETAIL({messageBatch:options.id}).then(res => {
				uni.hideLoading()
				if (res.status) {
					this.detail = res.data
					uni.setNavigationBarTitle({
						title: res.data.content
					});
				} else {
					uni.showToast({
						title: res.msg,
						mask: true,
						icon: 'none'
					})
				}
			})
		}
	}
</script>

<style lang="scss">

</style>
