<template>
	<view class="">
		<view class="mainBox">
			<view class="bindBox">
			<view class="fz32 color3 dja headTite">
				扫描孩子手机的“绑定设备二维码”
			</view>
				<image mode="aspectFit" class="bgImg" src="https://hsapmarket.zy845.com/guard/wx/device2x-2.png">
				</image>
			</view>
			<view class="footBox fc jc ac">
				<view class="disfr jsb ac">
					<view class="inputclass disfr ac jc fz32 color17B">
						<view class="dja fw600 inputBox" @click="goinput">输入绑定码</view>
					</view>
					<view class="submitBtn fw600 cof dja fz32" @click="open">
						扫一扫
					</view>
				</view>
			</view>
			<uni-popup ref="popup" type="primary" background-color="#fff">
				<view class="popup-content fc ac">
					<view class="disfr ac color3 fw400 fz30" style="margin-bottom: 32rpx;">
						绑定申请已发送给孩子端设备，孩子端同意后即可绑定成功。
					</view>
					<text class="fz32 fw600 color17B" @click="close">我知道了</text>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputCode: '',
				customBar: '',
				isAnonymous:true,
				isTestUse:false,
			};
		},
		onLoad(query) {
			this.$apiCom.getChild({}).then(res => {
				if (res.code == 0) {
					if(res.data.length>0){
						this.isTestUse=false
					}else{
						this.isTestUse=true
					}
				}
			})
			this.customBar = getApp().globalData.customBar;
			if (query.type) {
				this.$refs.popup.open('center')
			}
			if(uni.getStorageSync('testClickNum')==1&&uni.getStorageSync('isLoginTest')){//试用模式下第一次点击
				this.isAnonymous=true
			}else{
				this.isAnonymous=false
			}
		},
		methods: {
			input(e) {
				this.inputCode = e.detail.value
			},
			noband() {
				this.$fun.clear()
				this.$store.commit("user/CLEAR_BINDUSER", {id:null});
				if(uni.getStorageSync('testToken')){
					uni.setStorageSync('token', uni.getStorageSync('testToken'));
					let user = {
						hasLogin: true,
						token: uni.getStorageSync('testToken'),
					}
					this.$fun.setUser(user) //本地存储到StorageSync中
					uni.setStorageSync('isLoginTest',true)
					this.$store.commit("user/SET_USER_INFO",
						user) //先将用户信息保存到Vuex
						uni.switchTab({
						  url: "/pages/home/home"
						})
						return
				}
				this.$apiCom.guideLogin({}).then(response => {
					if (response.code == 0) {
						uni.setStorageSync('isLoginTest',true)
						uni.setStorageSync('testClickNum', 1);//试用模式下第一次点击
						uni.setStorageSync('token', response.data);
						uni.setStorageSync('testToken', response.data);
						let user = {
							hasLogin: true,
							token: response.data,
						}
						this.$fun.setUser(user) //本地存储到StorageSync中
						this.$store.commit("user/SET_USER_INFO",
							user) //先将用户信息保存到Vuex
						uni.switchTab({
						  url: "/pages/home/home"
						})
					}
				})
			},
			getBoundDevice(obj) {
				this.$apiCom.getBoundDevice(obj).then(res => {
					if (res.code == 0) {
						let dataObj = res.data
						if (res.data.gender == 2) {
							dataObj.showData = '女'
						} else if (res.data.gender == 1) {
							dataObj.showData = '男'
						} else {
							dataObj.showData = ''
						}
						dataObj.deviceCode = obj.code
						let list = encodeURIComponent(JSON.stringify(dataObj))
						uni.navigateTo({
							url: '/page_detail/setchildinfo/setchildinfo?list=' + list
						})
					}else if (res.code == 3013) {
						uni.showToast({
							title: '绑定码错误',
							icon: "none",
							duration: 2000
						})
						return
					} else {
						let type = encodeURIComponent(JSON.stringify({
							type: true,
							deviceCode: obj.code
						}))
						uni.navigateTo({
							url: '/page_detail/setchildinfo/setchildinfo?list=' + type
						})
					}
				})
			},
			sunbmit() {
				if (this.inputCode) {
					this.getBoundDevice({
						code: this.inputCode
					})
				} else {
					uni.showToast({
						title: '请输入绑定码',
						icon: "none"
					})
				}
			},
			open() {
				let that = this
				uni.scanCode({
					scanType: ['qrCode'],
					success: function(res) {
						let s=!/^\d{1,6}$/.test(res.result)
						if(s){
							uni.showToast({
								title: '绑定码获取失败',
								icon: "none"
							})
							return
						}
						that.getBoundDevice({
							code: res.result
						})
					},
					fail: (err) => {
						uni.showToast({
							title: '扫码失败',
							icon: "none"
						})
					},
				})

			},
			close() {
				this.$refs.popup.close()
				uni.reLaunch({
					url: '/pages/home/home'
				});
			},
			goinput() {
				uni.navigateTo({
					url: "/page_writeOff/devicecode/devicecode",
				});
			},
			goback() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bmainBoxImg {
		width: 100%;
	}

	.headBox {
		position: relative;

		.new-top {
			.headBgImg {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
			}

			width: 74%;
			height: auto;
			padding: 0 22rpx;
			box-sizing: border-box;
			overflow: hidden;

			.backBtn {
				position: absolute;
				left: 0;
				bottom: 6rpx;
				width: 22rpx;
				height: 36rpx;
				padding: 0 28rpx 18rpx 20rpx;
			}
		}

	}

	.mainBox {
        background-color: #F5f5f5;
		height: 100vh;
		padding-top: 16rpx;
		box-sizing: border-box;
		.headTite {
			margin-bottom: 40rpx;
		}
		.bindBox {
			width: 686rpx;
			background: #FFFFFF;
			border-radius: 32rpx 32rpx 32rpx 32rpx;
			padding: 68rpx 42rpx 108rpx;
			box-sizing: border-box;
			margin: 32rpx;
			.bgImg {
				width: 602rpx;
				height: 732rpx;
			}
		}
		.footBox{
			background: #FFFFFF;
			padding: 20rpx 94rpx 28rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			right: 0;
		}
		.scanBtn {
			width: 562rpx;
			height: 88rpx;
			background: #0066FF;
			border-radius: 48rpx;
			margin: 28rpx 0 48rpx;
		}

		.inputBox {
			width: 314rpx;
			height: 88rpx;
			background: rgba(189, 189, 189, 0.13);
			border-radius: 48rpx;
		}

		.submitBtn {
			width: 316rpx;
			height: 88rpx;
			background: #0066FF;
			border-radius: 48rpx;
			margin-left: 62rpx;
		}

		.popup-content {
			padding: 52rpx 48rpx;
			border-radius: 32rpx;
			background-color: #fff;
			width: 670rpx;
			box-sizing: border-box;

		}

		.inputclass {
			border-radius: 48rpx;
			background-color: rgba(189, 189, 189, 0.13);
			width: 300rpx;
			height: 88rpx;
			box-sizing: border-box;
		}
	}
</style>
<style>
	.uni-popup .uni-popup__wrapper {
		border-radius: 32rpx;
	}
</style>
