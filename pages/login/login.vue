<template>
	<view class="">
		<view class="loginBox">
			<image class="loginImg" src="https://hsapmarket.zy845.com/guard/wx/loginBg2x.png"></image>
			<view class="loginText fc ac jc">
				<image src="https://hsapmarket.zy845.com/guard/wx/logo2x-1.png" mode="" class="logoicon"></image>
				<view class="">
					<image src="https://hsapmarket.zy845.com/guard/wx/logoText-1.png" mode="" class="logoiconText">
					</image>
				</view>
			</view>
		</view>
		<view class="loginMain fz32 fc ac jc">
			<text class=" color3 fw400">登录后才可使用哦～</text>
			<view class="loginBtn cof dja fw600" @click="loginBtn">
				立即登录
			</view>
			<view class="foottext fz24 color9 fw400 disfr ac jc">
				<view class="foottext disfr ac jc fz28 color17B fw400" style="z-index:1;" @click="goideBtnLogin">
					<text>暂不登录，先试用一下</text>
					<uni-icons type="right" color="#0066FF" size="24rpx"></uni-icons>
				</view>
			</view>
		</view>
		<view class="footBox">
			<view class="footMain">
				<view class="foottext fz24 color9 fw400 disfr ac jc">
					<radio-group>
						<view class="radioBox" @click="changeCheck">
							<radio value="isRead" :checked="isRead" style="transform:scale(0.6)" color="#0066FF" />
						</view>	
					</radio-group>
					<text class="">我已阅读并同意</text><text class="color17B"
						@click="goDetail(1)">隐私政策</text><text>和</text><text class="color17B"
						@click="goDetail(2)">用户协议</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex"
	export default {
		computed: {
			...mapGetters(["userInfo"]), //获取vuex中存的数据
		},
		data() {
			return {
				isRead: false,
				code: null,
				url: '',
				isRepeat: false,
			};
		},
		onLoad(query) {
			if (JSON.stringify(query) != "{}") {
				let options = JSON.parse(decodeURIComponent(query.url))
				this.url = options.url
			}
		},
		methods: {
			loginBtn() {
				if (!this.isRead) {
					uni.showToast({
						title: '请先阅读隐私政策和用户协议',
						icon: "none"
					});
					return
				}
				if(this.isRepeat){
					uni.showToast({
						title: '2秒内不可重复登录',
						icon: "none"
					});
					return
				}
	            setTimeout(() => {
					// 2 秒后重新允许点击
					this.isRepeat = false;
				}, 2000);
this.isRepeat = true;
				let that = this
				uni.login({
						provider: 'weixin',
						success: (res) => {
							that.code = res.code
						},
					}),
					// uni.getUserProfile({ //getUserInfo
					uni.getUserInfo({ //getUserInfo
						desc: '登录',
						success: (info) => {
							//这里取到的是用户的信息，自己安排自己的业务
							uni.checkSession({
								provider: 'weixin',
								success: function(loginRes) {
									uni.showLoading({
										title: "加载中",
										mask: true,
									});
									that.loginEvent(info)
								},
								fail() {
									uni.showLoading({
										title: "加载中",
										mask: true,
									});
									that.loginEvent(info)
								}
							})
						},
						fail: (err) => {
							uni.showLoading({
								title: "加载中",
								mask: true,
							});
							that.loginEvent(info)
						}
					})
			},
			changeCheck(val) {
				this.isRead = !this.isRead
			},
			goideBtnLogin() {
				if(uni.getStorageSync('testToken')){
					uni.setStorageSync('token', uni.getStorageSync('testToken'));
					let user = {
						hasLogin: true,
						token: uni.getStorageSync('testToken'),
					}
					this.$fun.setUser(user) //本地存储到StorageSync中
					this.$store.commit("user/SET_USER_INFO",
						user) //先将用户信息保存到Vuex
						uni.setStorageSync('isLoginTest',true);
						
						this.$store.commit("user/SET_BINDUSER", {id:''});
						uni.switchTab({
							url: '/pages/home/home'
						});
						return
				}else{
				this.$apiCom.guideLogin({}).then(response => {
					if (response.code == 0) {
						uni.setStorageSync('testClickNum', 1);//试用模式下第一次点击
						uni.setStorageSync('isLoginTest',true);
						uni.setStorageSync('token', response.data);
						uni.setStorageSync('testToken', response.data);
						let user = {
							hasLogin: true,
							token: response.data,
							// userInfo: response.data.userInfo,
						}
						// uni.setStorageSync('userInfo',user)
						this.$fun.setUser(user) //本地存储到StorageSync中
						this.$store.commit("user/SET_USER_INFO",
							user) //先将用户信息保存到Vuex
							uni.setStorageSync('isLoginTest',true);
						
						this.$store.commit("user/SET_BINDUSER", {id:''});
						uni.switchTab({
							url: '/pages/home/home'
						});
						return
					}
				})
			    }
			},
			loginEvent(info) {
				// uni.login({
				// 	provider: 'weixin',
				// 	success: (res) => {
				//这里获取的是用户的code，用来换取 openid、unionid、session_key 等信息，再将信息丢给后台自己的登录业务就行了
				let obj = {
					code: this.code,
					userInfo: info.userInfo,
					rawData: info.rawData,
					signature: info.signature
				}
				uni.hideLoading();
				this.$apiCom.userLogin(obj).then(response => {
					if (response.code == 0) {
						uni.setStorageSync('token', response.data.token);
						uni.setStorageSync('isLoginTest',false);
						let user = {
							hasLogin: true,
							token: response.data.token,
							userInfo: info.userInfo,
						}
						this.$fun.setUser(user) //本地存储到StorageSync中
						this.$store.commit("user/SET_USER_INFO",
							user) //先将用户信息保存到Vuex
						this.$apiCom.getChild().then(reschild => {
							if (reschild.code == 0) {
								// 绑定的有孩子跳转到首页 没有绑定孩子跳转到绑定页
								if (reschild.data.length <= 0) {
									uni.navigateTo({
										url: "/page_writeOff/binddevice/binddevice",
									});
									return
								} else {
									// 判断是否有目标地址
									if (this.url && uni.getStorageSync('pageUrl')) {
										if (this.url == '/pages/login/login?'||this.url.indexOf('/pages/login/login?') !== -1) {
											uni.removeStorageSync('pageUrl')
											uni.switchTab({
												url: '/pages/home/home'
											});
											return
										}
										if (['/pages/home/home?', '/pages/mine/mine?',
												'/pages/information/information?',
												'/pages/information/information?'
											].indexOf(this.url) >= 0) {
											uni.switchTab({
												url: this.url
											});
										} else {
											uni.redirectTo({
												url: this.url
											});
										}
										uni.removeStorageSync('pageUrl')
									} else {
										uni.switchTab({
											url: '/pages/home/home'
										});
									}
								}
							} else {
								uni.showToast({
									title: res.msg,
									icon: "none",
								})
							}
						})



					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
						})
					}
				})
			},
			goDetail(val) {
				uni.navigateTo({
					url: "/page_writeOff/publicpage/publicpage?type=" + val
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loginBox {
		width: 100%;
		height: 674rpx;
		position: relative;

		.loginImg {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}

		.loginText {
			position: absolute;
			top: 360rpx;
			left: 254rpx;
		}

		.logoicon {
			width: 144rpx;
			height: 144rpx;
		}

		.logoiconText {
			width: 204rpx;
			height: 54rpx;
			margin: 22rpx 0 16rpx 0;
		}
	}

	.loginMain {
		.loginBtn {
			width: 562rpx;
			height: 88rpx;
			border-radius: 50rpx;
			background: #0066FF;
			margin: 24rpx 0 80rpx;
		}
	}

	.footBox {
		position: fixed;
		bottom: 134rpx;
		left: 0;
        right: 0;
		.footMain {
			// position: relative;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
			.footimg {
				width: 750rpx;
				height: 200rpx;
				display: block;
				margin-top: -60rpx;
			}

			.foottext {
				
			}

			.radioBox {
				padding: 10rpx 0 10rpx 10rpx;
			}
		}

	}
</style>
