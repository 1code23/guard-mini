<template>
	<view class="mainBox">
		<view class="topBox fc jc ac">
			<image src="https://apmarket.tt286.com/teeny/icon/attention2x.png" mode="" class="outicon"></image><text
				class="layouttitle">注销账号</text>
		</view>
		<view class="centerBox">
			<view class="color0 fw700 fz32 txtitle">账号注销后，将无法恢复。</view>
			<view class="fz28 color6">
				<view class='tx'>· 注销前请确认当前账号已和孩子端手机解除绑定关系。</view>
				<view class='tx'>· 注销后，该账号下的全部数据包括设置项均将全部删除，且无法恢复。</view>
				<view class='tx'>· 注销后，3个自然日内再次登录该账号，即取消注销账号。</view>
			</view>
		</view>
		<view class="footBox dja fz32">
			<view class="dja writeoff fw600" @click="cancel">继续注销</view>
		</view>
		<uni-popup ref="bindDialog" type="dialog">
				<DialogPoup content="注销后，您的所有数据均将被清空，确定要注销吗? " closeStr= "我再想想" submitStr="确定注销" @closeBtn="closebindDialog" @submitBtn="confirmbindDialog"></DialogPoup>
		</uni-popup>
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content fc ac">
				<view class="disfr ac color3 fw400 fz30" style="margin-bottom: 32rpx;">
					当前账号还未和全部孩子手机解除绑定关系，请先解绑后再进行注销操作。
				</view>
				<text class="fz32 fw600 color17B" @click="closePopup">我知道了</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex"
	import DialogPoup from '../components/dialogPoup/dialogPoup.vue'
	export default {
		components: { DialogPoup },
		computed: {
			...mapGetters(["userInfo"]), //获取vuex中存的数据
		},
		data() {
			return {

			};
		},
		methods: {
			closebindDialog() {
				this.$refs.bindDialog.close();
			},
			confirmbindDialog() {
				this.$apiCom.cancelAccount({
					id: this.userInfo.id
				}).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '操作成功',
							duration: 2000
						})
						let that = this
						setTimeout(function() {
							that.$refs.bindDialog.close();
							that.$fun.clear()
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}, 2000);

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					}
				})

			},
			cancel() {
				if(uni.getStorageSync('isLoginTest')){
					uni.showToast({
						title: '试用模式下不可注销',
						icon: 'none'
					})
					return
				}
				this.$apiCom.getChild({}).then(res => {
					if (res.code == 0) {
						if(res.data.length>0){
							this.$refs.popup.open();
						}else{
							this.$refs.bindDialog.open();
						}
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
				})
			},
			closePopup(){
				this.$refs.popup.close();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		padding: 116rpx 0rpx 120rpx;
		background-color: #f5f5f5;
		height: 100vh;
		box-sizing: border-box;
        overflow-y: scroll;
		.topBox {
			.outicon {
				width: 148rpx;
				height: 148rpx;
				border-radius: 50%;
				margin-bottom: 28rpx;
			}

			.layouttitle {
				font-size: 36rpx;
				font-weight: 500;
				color: #000;
			}
		}

		.centerBox {
			width: 686rpx;
			padding: 32rpx;
			box-sizing: border-box;
			border-radius: 32rpx;
			background: #FFFFFF;
			margin: 116rpx 32rpx 32rpx;

			.txtitle {
				margin-bottom: 6rpx;
				margin-bottom: 22rpx;
			}

			.tx {
				margin: 5rpx 0;
				line-height: 40rpx;
			}
		}

		.agreedesc {
			color: #EB5F58;
		}

		.footBox {
			position: absolute;
			left: 0rpx;
			bottom: 0rpx;
			background-color: #fff;
			padding: 20rpx 0rpx 28rpx;
			width: 100%;
			.writeoff {
				width: 562rpx;
				height: 88rpx;
				background: #EEEEEE;
				border-radius: 58rpx;
				color: #F01818;
			}
		}
	}

	/deep/ .uni-button-color {
		color: #EB5F58;
	}
	.popup-content {
		padding: 32rpx 48rpx;
		border-radius: 26rpx;
		background-color: #fff;
		width: 670rpx;
		box-sizing: border-box;
	}
</style>
<style>
	.uni-popup .uni-popup__wrapper {
		border-radius: 26rpx;
	}
</style>
