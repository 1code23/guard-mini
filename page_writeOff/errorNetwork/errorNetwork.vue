<template>
	<view class="mainBox fc jc ac">
		<text>网络连接已断开，请检查网络设置。</text>
		<view class="disfr jc ac footBox fz32 cof">
			<view class="saveBtn fw600  dja" @click="retry">重试</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
		    retry() {
		      uni.getNetworkType({
		        success: (res) => {
		          if (res.networkType !== 'none') {
		            uni.navigateBack({
		              delta: 1,
		            });
		          } else {
		            uni.showToast({
		              title: '仍然未连接',
		              icon: 'none',
		            });
		          }
		        },
		      });
		    },
		  },
	}
</script>

<style lang="scss">
.mainBox {
	padding: 40% 40rpx 24rpx;
	font-size: 32rpx;
	.footBox {
		height: 88rpx;
		margin-top: 84rpx;
		.saveBtn {
			width: 562rpx;
			height: 88rpx;
			border-radius: 48rpx;
			background-color: #0066FF;
		}
	}
}
</style>
