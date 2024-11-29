<template>
	<view class="content">
		<view class="headBox" :style="[{ 'height': customBar + 'px'},{ 'line-height' : customBar+20 + 'px'}]">
			<view class="new-top">
				<view class="">
					<view class="color0 backBtn">消息</view>
					<view class="disfr ac titleText" v-show="!isRead&&!isAnonymous" @click="readevent">
						<image src="https://apmarket.tt286.com/teeny/icon/clean2x.png" mode="" class="iconclean">
						</image>
						<text class="fz28 color6">一键已读</text>
					</view>
					<view class="disfr ac gifBox" v-show="!isAttention" @click="Attention">
						<image src="https://hsapmarket.zy845.com/guard/wx/gzf-1.png" mode="" class="icongif"></image>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isRead: {
				type: Boolean,
				default: false
			},
			isAttention: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				customBar: '',
				isAnonymous:true
			}
		},
		created() {
			this.customBar = getApp().globalData.customBar;
			if(uni.getStorageSync('testClickNum')&&uni.getStorageSync('isLoginTest')){//试用模式下第一次点击
								this.isAnonymous=true
							}else{
								this.isAnonymous=false
							}
		},
		methods: {
			readevent() {
				this.$emit("send", )
			},
			Attention() {
				this.$emit("eventisAttention", )
			}
		}

	}
</script>

<style lang="scss">
	.icongif {
		// width: 72rpx;
		// height: 66rpx;
		width: 75rpx;
		height: 63.5rpx;
		margin-right: 42rpx;
	}

	.iconclean {
		width: 40rpx;
		height: 40rpx;
		margin-left: 32rpx;
	}

	.headBox {
		position: relative;
		background: #FFF;

		.new-top {
			width: 100%;
			height: auto;
			padding: 0 22rpx;
			box-sizing: border-box;
			overflow: hidden;

			.backBtn {
				position: absolute;
				left: 40rpx;
				bottom: 6rpx;
				width: 88rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 44rpx;
			}

			.titleText {
				position: absolute;
				left: 125rpx;
				height: 60rpx;
				line-height: 60rpx;
				bottom: 6rpx;
			}

			.gifBox {
				position: absolute;
				left: 440rpx;
				bottom: 6rpx;
			}
		}
	}
</style>
