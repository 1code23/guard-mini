<template>
	<view>
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="fc ac  ">
				<view class="disfr ac proupContent color3 fw400 fz30">
					当前为试用模式，所有设置均不生效
				</view>
				<text class="fz32 fw400 color17B mb32" @click="closedialog">我知道了</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default{
		data(){return{}},
		methods:{
			opendialog() {
				// if(uni.getStorageSync('testClickNum')==1){//试用模式下第一次点击
					uni.setStorageSync('testClickNum', 2)
					this.$refs.popup.open('center')
				// }
			},
			closedialog() {
				uni.setStorageSync('testClickNum', 2)
				this.$refs.popup.close()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.proupContent {
		padding: 52rpx 48rpx 66rpx;
		text-align: center;
	}
	.mb32{
		margin-bottom: 32rpx;
	}
</style>