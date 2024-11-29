<template>
	<view>
		<view class="popup-content fc ac color17B">
			<view class="pountBox">
				<image  src="https://hsapmarket.zy845.com/guard/wx/popout2x-1.png" mode="" class="pountPng">
				</image>
			</view>
			<view class="disfr je wi100">
				<image src="https://hsapmarket.zy845.com/guard/wx/btnclose2x.png" mode="" class="btnclose"
					@click="close"></image>
			</view>
			<view class="color3 puountTitle fw500">关注微信公众号</view>
			<view class="color6 pountdesc">由于小程序无法推送消息，建议您关注我们的【亲情呵护】公众号，我们将持续为您提供消息提醒的服务。</view>
			<button v-if="isscene" type="default" class="btn fz32 btn-official">立即关注<official-account class="official-account"
					id="official_account"></official-account>
			</button>
			<button v-if="!isscene" type="default" class="btn fz32 btn-official" @click="gofollow">立即关注</button>
		</view>
	</view>
</template>

<script>
	export default {
		name:"follow",
		data() {
			return {
				isscene:false,
			};
		},
		created() {
			if([1011,1017,1047].includes(getApp().globalData.scene)){
			this.isscene=true
			}else{
				this.isscene=false
			}
		},
		methods:{
			close(){
				this.$emit('followClose')
			},
			gofollow(){
			  uni.navigateTo({
				url: '/page_writeOff/webview/webview'
			  })
			}
		}
	}
</script>

<style lang="scss" scoped>
.popup-content {
			border-radius: 32rpx;
			background-color: #fff;
			width: 654rpx;
			box-sizing: border-box;
			.pountBox {
				position: relative;
			}
			.puountTitle {
				font-size: 40rpx;
				margin-top: 32rpx;
			}
			.pounttitleT {
				font-size: 36rpx;
				margin-bottom: 24rpx;
			}
			.pountPng {
				width: 654rpx;
				height: 332rpx;
			}
			.btnclose {
				position: absolute;
				top: 30rpx;
				right: 30rpx;
				width: 44rpx;
				height: 44rpx;
			}
			.pountdesc {
				font-size: 28rpx;
				width: 520rpx;
				height: 120rpx;
				// text-align: center;
			}
			.btn {
				position: relative;
				width: 574rpx;
				height: 88rpx;
				line-height: 88rpx;
				// border-radius: 28rpx;
				border-radius: 48rpx;
				margin: 32rpx 0 48rpx;
				padding: 0;
				background: #0066FF;
				overflow: hidden;
				text-align: center;
				color: #fff;
				font-size: 32rpx;
				font-weight: 500;
				.official-account {
					position: absolute;
					z-index: 20211209;
					right: -14px;
					top: -40px;
					opacity: 0;
				}
			}
}
</style>