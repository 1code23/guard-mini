<template>
	<view>
		<uni-popup ref="bindDialog" type="dialog">
			<uni-popup-dialog mode="base" title=" " content="当前为试用模式,绑定后可体验完整功能" :before-close="true"
				@close="closedialog" @confirm="confirmbindDialog" cancelText="继续试用" confirmText="立即绑定">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{}
		},
		methods:{
			opendialog() {
			   this.$refs.bindDialog.open('center')
			},
			closedialog() {
				this.$refs.bindDialog.close()
			},
			confirmbindDialog() {
				this.$fun.clear()
				this.$store.commit("user/CLEAR_BINDUSER", {id:null});
				this.$refs.bindDialog.close();
				uni.redirectTo({
					url: '/pages/login/login'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.proupContent {
		padding: 52rpx 48rpx 66rpx;
		text-align: center;
	}
</style>