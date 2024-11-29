<template>
	<view class="container">
		<view class="page-section page-section-gap">
			<map style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="covers"
				id="isMap" include-points='includePoints'> <!-- show-location 显示箭头标记 -->
				<!-- <view class="flag" @click="getlocation">
					<image v-if="ISVIP" src="https://apmarket.tt286.com/teeny/icon/zoomin2x.png" mode=""
						class="iconlocation"></image>
					<image v-else src="https://apmarket.tt286.com/teeny/icon/noZoomin2x.png" mode=""
						class="iconlocation"></image>
				</view> -->
				<view class="modalBox">
					<view class="disfr  mlr40">
						<view class="childAvatarBox">
							<image v-if="imageVisible" :src="userinfo.avatarUrl" mode="" class="avatarimg"></image>
						</view>
						<view class="fc jsb childinfo">
							<view class="disfr ac jsb">
								<text class="fz32 color3">{{userinfo.nickName}}</text>
								<text class="fz28 colorc">{{formatDateFromNow(userinfo.time)}}</text>
							</view>
							<text class="fz24 color9 mainContentBox">{{userinfo.place}}</text>
						</view>
					</view>
					<view class="curLocBtns">
						<view class="btn-common btnNav" @click="navigation">导航</view>
						<view class="btn-common btnCall" @click="callphone">
							拨打电话
						</view>
					</view>
				</view>
			</map>
		</view>
		<uni-popup ref="inputDialog" type="dialog" :animation="false">
			<uni-popup-dialog ref="inputClose" @close="close" :before-close="true" mode="input" title="请先设置手机号码"
				:value="inputPhoneNo" placeholder="请输入老人的手机号码" @confirm="dialogInputConfirm"
				class="custom-popup-dialog">
				<input type="number" :value='inputPhoneNo' class="uni-input nicknameinput" @input="inputsPhone"
					placeholder="请输入老人的手机号码" />
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="memberPoup" type="center" :is-mask-click='false'>
			<MemberPoup type='express' text='会员已到期,续费后可继续使用定位功能' @renewBtn='renewBtn' @closeMember='closeMember'>
			</MemberPoup>
		</uni-popup>
		<uni-popup ref="bindDialog" type="dialog">
			<uni-popup-dialog mode="base" title=" " content="当前为试用模式,绑定后可体验完整功能" :before-close="true"
				@close="closebindDialog" @confirm="confirmbindDialog" cancelText="继续试用" confirmText="立即绑定">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		bd09togcj02
	} from "@/utils/coordinateConversion.js"
	import MemberPoup from '@/components/memberPoup/memberPoup.vue'
	import {
		mapGetters
	} from "vuex"
	import {formatDateFromNow} from "@/libs/util.js"

	export default {
		components: {
			MemberPoup
		},
		computed: {
			...mapGetters(["binduser"]), //获取vuex中存的数据
		},
		mounted() {
			this.loadImage(); // 初始加载图片
			uni.onNetworkStatusChange((res) => {
				if (res.isConnected) {
					this.loadImage(); // 网络恢复时重载图片
				} else {
					// console.log('网络已断开');
				}
			});
		},
		data() {
			return {
				imageVisible: false, //断网图片不显示
				ISVIP: false,
				isAnonymous: true, //true试用模式
				inputPhoneNo: null,
				bd09togcj02,//经纬度转换
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				longitude: null,
				latitude: null,
				covers: [{
					id: 1,
					longitude: null,
					latitude: null,
					iconPath: 'https://hsapmarket.zy845.com/guard/wx/parent.png',
					width: 30,
					height: 30,
					clickable: true
				}],
				loa: [],
				userinfo: {
					avatarUrl: '',
					nickName: "",
					place: '',
					time: '',
					phoneNo: ''
				},
				isShowplace: false,
				isAdmin: false,
				childList: [],
				childId:'',
				isTabBtnClicked:false
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			formatDateFromNow,
			async getlocation() {
				if (uni.getStorageSync('network') == 'no') {
					uni.showToast({
						title: '请检查网络连接',
						icon: "none"
					})
					return
				}
				if (!this.ISVIP) {
					return
				}
				let response = await this.$apiCom.homeRefresh(this.binduser.id, {})
				if (response.code == 0) {
					let that = this
					this.$apiCom.userinfo({}).then((res) => {
						if (res.code == 0) {
							let child = res.data.elder.find(item => {
								return item.id === that.binduser.id
							})
							if (child.location) {
								that.loa = that.bd09togcj02(Number(child.location.latitude), Number(child
									.location.longitude))
								that.isShowplace = true
								that.userinfo.avatarUrl = child.avatarUrl
								that.userinfo.nickName = child.nickName
								that.covers[0].latitude = that.loa[0]
								that.covers[0].longitude = that.loa[1]
								that.latitude = that.loa[0]
								that.longitude = that.loa[1]
								that.covers[0].iconPath = child.avatarUrl
								that.userinfo.place = child.location && child.location.address || ""
								that.userinfo.time = child.device && child.device.lastConnectTime || ""
								that.userinfo.phoneNo = child && child.phoneNo || ''
								let nowplace = []
								uni.createMapContext("isMap", this).moveToLocation({
									latitude: this.loa[0],
									longitude: this.loa[1],
									success: function(res2) {
										setTimeout(function() {
											ss(that.loa)
										}, 500);
									},
									fail(res) {
										uni.showModal({
												content: '需要授权获取老人位置信息',
												confirmText: '确认授权'
											})
											.then((res) => {
												if (res[1]['confirm']) {
													uni.openSetting({
														success: (res) => {
															if (res.authSetting[
																	'scope.userLocation'
																]) {
																// 授权成功
																uni.showToast({
																	title: '授权成功',
																	icon: 'none'
																})

															} else {
																// 未授权
																uni.showToast({
																	title: '授权失败',
																	icon: 'none'
																})
															}
														}
													})
												}
												if (res[1]['cancel']) {
													// 取消授权
													uni.showToast({
														title: '您取消了授权',
														icon: 'none'
													})
												}
											})


									}
								});
								function ss(loaa) {
									let la = []
									let points = [{
										latitude: loaa[0],
										longitude: loaa[1],
									}]
									uni.createMapContext("isMap", this).getCenterLocation({
										success: function(res1) {
											la.push({
												latitude: res1.latitude,
												longitude: res1.longitude,
											})
											points = points.concat(la)
											uni.createMapContext("isMap", this).includePoints({
												points: points,
												padding: [100, 100, 100, 100]
											})
										},
										fail: function(res1) {
											uni.createMapContext("isMap", this).includePoints({
												points: points,
												padding: [100, 100, 100, 100]
											})
										}
									})
								}
							} else {
								this.isShowplace = false
								uni.showToast({
									title: res.msg,
									icon: "none"
								})
								return
							}
						}
					})
				} else {
					uni.showToast({
						title: response.msg,
						icon: "none",
						duration: 2000
					})
				}
			},
			init() {
				this.$apiCom.userinfo({
					childId: this.binduser.id,
					isLoad: true
				}).then((res) => {
					if (res.code == 0) {
						this.isAnonymous = res.data.isAnonymous
						if (!this.binduser.id) {
							let bindChildreninfo = res.data.elder[0] || {
								id: ''
							};
							this.childId = bindChildreninfo.id
							if (!uni.getStorageSync('X-Child-Id')) {
								uni.setStorageSync('X-Child-Id', this.childId)
							}
							this.$store.commit("user/SET_BINDUSER", bindChildreninfo);
						}
						// else {
						let obj = {}
						for (let i = 0; i < res.data.elder.length; i++) {
							if (this.binduser.id == res.data.elder[i].id) {
								obj = res.data.elder[i]
								this.childId = obj.id
							}
						}
						this.$store.commit("user/SET_BINDUSER", obj);
						if (!obj.premium || obj.premium && obj.premium.state != 'active') {
							this.ISVIP = false
							if (this.binduser.avatarUrl) { //绑定老人时且会员过期显示
								this.$refs.memberPoup.open('center')
							}
						} else {
							this.ISVIP = true
						}
						// }
						this.isAdmin = res.data.isAdmin
					}
					// })判断
					if (this.binduser.location && this.binduser.location.latitude && this.binduser.location
						.longitude) {
						this.loa = this.bd09togcj02(Number(this.binduser.location.latitude), Number(this.binduser
							.location
							.longitude))
						this.isShowplace = true
					} else {
						this.loa = this.bd09togcj02(31.183582, 121.422893)
						this.isShowplace = false
					}
					this.userinfo.avatarUrl = this.binduser.avatarUrl
					this.userinfo.nickName = this.binduser.nickName
					if (this.ISVIP) {
						this.covers[0].latitude = this.loa[0]
						this.covers[0].longitude = this.loa[1]
					}
					this.latitude = this.loa[0]
					this.longitude = this.loa[1]
					this.covers[0].iconPath = this.binduser.avatarUrl
					this.userinfo.place = this.binduser.location && this.binduser.location.address || ""
					this.userinfo.time = this.binduser.device && this.binduser.device.lastConnectTime || ""
					if (!this.ISVIP) {
						this.userinfo.place = this.userinfo.avatarUrl ? '会员已到期,续费后可继续使用定位功能' : '暂未绑定老人'
					}
					this.userinfo.phoneNo = this.binduser.phoneNo || ''
				})
			},
			getchildrenList() {
				this.$apiCom.userinfo({
					childId: this.binduser.id
				}).then((res) => {
					if (res.code == 0) {
						this.childList = res.data.elder
					}
				})
			},
			navigation() {
				if (this.isTabBtnClicked) {
					uni.showToast({
						title: '不可重复操作',
						icon: 'none'
					})
					return;
				}
				if (uni.getStorageSync('network') == 'no') {
					uni.showToast({
						title: '请检查网络连接',
						icon: "none"
					})
					return
				}
				if (this.isAnonymous) {
					this.$refs.bindDialog.open();
					return
				}
				wx.getSystemInfo({
					success: (res) => {
						if (res.platform === 'windows' || res.platform === 'mac') {
							// PC端代码
							uni.showToast({
								title: '请使用真机导航',
								icon: 'none'
							})
							return
						}
					}
				});
				this.isTabBtnClicked = true
				setTimeout(() => {
					this.isTabBtnClicked = false
					uni.openLocation({
						latitude: this.loa[0], //目标纬度
						longitude: this.loa[1], //目标经度
						// name: item.biz_address, //名称
						address: this.binduser.location.address || '', //地址
						scale: 28
					});
				}, 1000);
			},
			callphone() {
				if (uni.getStorageSync('network') == 'no') {
					uni.showToast({
						title: '请检查网络连接',
						icon: "none"
					})
					return
				}
				if (this.isAnonymous) {
					this.$refs.bindDialog.open();
					return
				}
				if (!this.userinfo.phoneNo && !this.isAdmin) {
					uni.showToast({
						title: '管理员未设置老人的电话号码',
						icon: "none"
					})
					return
				} else if (!this.userinfo.phoneNo && this.isAdmin) {
					this.$refs.inputDialog.open();
					return
				}
				wx.getSystemInfo({
					success: (res) => {
						if (res.platform === 'windows' || res.platform === 'mac') {
							// PC端代码
							uni.showToast({
								title: '请使用真机拨打电话',
								icon: 'none'
							})
							return
						}
					}
				});
				uni.makePhoneCall({
					phoneNumber: this.userinfo.phoneNo
				});
			},
			closebindDialog() {
				this.$refs.bindDialog.close();
			},
			confirmbindDialog() {
				this.$fun.clear()
				this.$store.commit("user/CLEAR_BINDUSER", {
					id: null
				});
				this.$refs.bindDialog.close();
				uni.redirectTo({
					url: '/pages/login/login'
				});
			},
			close() {
				this.$refs.inputDialog.close();
			},
			closeMember() {
				this.$refs.memberPoup.close();
			},
			renewBtn() {
				if (!this.userinfo.avatarUrl) {
					uni.showToast({
						title: '请先绑定老人',
						icon: "none",
						duration: 2000
					})
					return
				}
				this.$refs.memberPoup.close();
				let childInfo = encodeURIComponent(JSON.stringify(this.binduser))
				uni.navigateTo({
					url: "/page_writeOff/buy/buy?childInfo=" + childInfo
				})
			},
			inputsPhone(e) {
				this.inputPhoneNo = e.detail.value
			},
			loadImage() {
				// 尝试重新加载图片
				this.imageVisible = false; // 隐藏图片
				setTimeout(() => {
					this.imageVisible = true; // 1秒后再尝试加载
				}, 1000);
			},
			dialogInputConfirm(val) {
				if (this.$fun.checkPhone(val)) {
					uni.showToast({
						title: '请输入正确手机号',
						icon: 'none'
					})
					return
				} else {
					let obj = {
						gender: this.binduser.gender,
						nickName: this.binduser.nickName,
						birthday: this.binduser.birthday,
						grade: this.binduser.grade,
						age: this.binduser.age,
						avatarUrl: this.binduser.avatarUrl,
						phoneNo: val
					}
					this.$apiCom.undataChild(this.binduser.id, obj).then(res => {
						if (res.code == 0) {
							this.close()
							this.init()
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				}

			}
		}
	}
</script>

<style lang="scss" scoped src="@/common/css/util.scss"></style>
<style lang="scss">
	.container {
		height: 100vh;
		overflow: hidden;

		.flag {
			position: absolute;
			right: 40rpx;
			bottom: 360rpx;

			.iconlocation {
				width: 80rpx;
				height: 80rpx;
			}
		}

		.modalBox {
			position: absolute;
			left: calc((100% - 670rpx) / 2);
			bottom: 30rpx;
			width: 670rpx;
			background: #FFFFFF;
			border-radius: 32rpx;
			padding: 32rpx 0rpx 0;
			box-sizing: border-box;

			.childinfo {
				width: 80%;
			}

			.childAvatarBox {
				position: relative;

				.vipPng {
					position: absolute;
					top: 67rpx;
					right: 11rpx;
					width: 40rpx;
					height: 22rpx;
				}

				.avatarimg {
					width: 88rpx;
					height: 88rpx;
					margin-right: 13rpx;
					box-sizing: border-box;
					border-radius: 50%;
				}
			}


			.hrline {
				width: 100%;
				height: 0rpx;
				border: 2rpx solid rgba(189, 189, 189, 0.13);
				margin: 28rpx 0 34rpx;
			}

			.btnBox {
				box-sizing: border-box;

				.iconPng {
					width: 40rpx;
					height: 40rpx;
					margin-right: 8rpx;
				}

				.borderleft {
					border-left: 2rpx solid rgba(189, 189, 189, 0.13);
				}
			}

			.scroll-view_H {
				white-space: nowrap;
				width: 100%;
			}

			.scroll-view-item {
				height: 300rpx;
				line-height: 300rpx;
				text-align: center;
				font-size: 36rpx;
			}

			.scroll-view-item_H {
				display: inline-block;
				width: 100%;
				height: 300rpx;
				line-height: 300rpx;
				text-align: center;
				font-size: 36rpx;
			}
		}
	}

	/deep/ .uni-button-color {
		color: #0066FF !important;
	}

	/deep/ .uni-dialog-input {
		border-radius: 50rpx !important;
	}

	.nicknameinput {
		text-align: left;
		color: #999;
		background: rgba(189, 189, 189, 0.13);
		border-radius: 48rpx;
		padding: 20rpx 30rpx;
		width: 100%;
	}

	.mlr40 {
		margin: 0 40rpx;
	}

	.w50 {
		width: 50%;
	}

	/deep/ .uni-popup .uni-popup__wrapper {
		// margin-top: -30rpx;
	}
</style>
