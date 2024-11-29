<template>
	<view class="minePage fc">
		<view class="homeHead">
			<image class="bgImg" src="https://hsapmarket.zy845.com/guard/wx/homeBg2x-1.png"></image>
			<view class="userBox">
				<view class="fc ac jc">
					<image :src="userinfo.avatarUrl" class="userimg" @click="gomineinfo"></image>
					<view class="color3 fz32" @click="gomineinfo">{{userinfo.identity}}</view>
				</view>
			</view>

		</view>
		<view class="mainBox fc jsb ">
			<view class="contentBox">
				<view class="" v-for="(itm,ind) in childrenList" :key="ind">
					<view v-if="false" :class="['member','djb','ac','borderbox',(itm.premium&&itm.premium.state=='active')?'isvipMember':'novipMember']" @click="goMember(itm)">
						<view class="dja">
							<image v-if="itm.premium&&itm.premium.state=='active'&&isRequired" src="https://apmarket.tt286.com/teeny/icon/isvip2x.png" mode="" class="memberPng">
							</image>
							<image v-else src="https://apmarket.tt286.com/teeny/icon/noVip2x.png" mode="" class="memberPng">
							</image>
							<view class="fz28" v-if="itm.premium&&itm.premium.state=='active'">{{rTime(itm.premium.expireAt)}}到期</view>
							<view class="fz28" v-if="itm.premium&&itm.premium.state=='inactive'">会员已到期，建议立即续费</view>
						</view>
						<image src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" mode="" class="arrowBtn"></image>
					</view>
					<view class="childBox borderbox bgcF">
						<view class="userList">
							<view class="disfr ac jsb">
								<view class="userinfo disfr ac jc">
									<image
									        :src="itm.avatarUrl"
									        mode=""
									       class="userpng"
									      ></image>
									<view class="">
										<text class="fz28 color3">{{itm.nickName}}</text>
									</view>
								</view>
								<view class="editBtn fw550 disfr ac jc color17B" @click="editBtn(itm)">
									{{itm.isAdmin?'编辑':'查看'}}</view>
							</view>
							<view class="disfr jsb ac setItem" @click="gofamily(itm)">
								<view class="leftBox disfr ac">
									<image src="https://hsapmarket.zy845.com/guard/wx/family2x.png" mode=""
										class="iconpng"></image><text class="fz30 color3">家庭成员</text>
								</view>
								<image src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" mode="" class="arrowBtn">
								</image>
							</view>
						</view>

					</view>
				</view>
				<view class="setBox borderbox bgcF">
					<view class="disfr jsb ac setItem" v-for="(ite,int) in rowList" :key="int"
						@click="godetail(ite.path,int)">
						<view class="leftBox disfr ac">
							<image :src="ite.icon" mode="" class="iconpng"></image><text
								class="fz30 color3">{{ite.title}}</text>
						</view>
						<image src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" mode="" class="arrowBtn"></image>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="bindDialog" type="dialog">
			<uni-popup-dialog mode="base" title=" " content="当前为试用模式,绑定后可体验完整功能" :before-close="true"
				@close="closebindDialog" @confirm="confirmbindDialog" cancelText="继续试用" confirmText="立即绑定">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	export default {
		computed: {
			...mapGetters(["binduser", "userInfo"]), //获取vuex中存的数据
		},
		onShow() {
			this.init();
		},
		  mounted() {
		    uni.onNetworkStatusChange((res) => {
		      if (res.isConnected) {
		        this.refreshImages(); // 网络恢复时刷新图片
		      }
		    });
		  },
		data() {
			return {
				isVip:true,
				isRequired:false,
				rTime:this.$fun.rTime,
				rowList: [
					{
						icon: 'https://hsapmarket.zy845.com/guard/wx/icdevice2x.png',
						title: '添加设备',
						path: '/page_writeOff/binddevice/binddevice'
					},
					{
						icon: 'https://hsapmarket.zy845.com/guard/wx/help2x.png',
						title: '帮助与反馈',
						path: '/page_writeOff/privacy/privacy'
					},
					{
						icon: 'https://hsapmarket.zy845.com/guard/wx/set2x.png',
						title: '设置',
						path: '/page_writeOff/setpage/setpage'
					},
				],
				userinfo: {},
				childrenList: []
			};
		},
		onPullDownRefresh() {
			this.refreshImages();
		},
		methods: {
			refreshImages() {
				this.childrenList.forEach((item, index) => {
				// 强制更新URL，避免缓存
				item.avatarUrl += '?t=' + new Date().getTime();
				});
				this.userinfo.avatarUrl += '?t=' + new Date().getTime();
				this.rowList[0].icon = "https://hsapmarket.zy845.com/guard/wx/icdevice2x.png?t=" + new Date().getTime();
				this.rowList[1].icon = "https://hsapmarket.zy845.com/guard/wx/help2x.png?t=" + new Date().getTime();
				this.rowList[2].icon = "https://hsapmarket.zy845.com/guard/wx/set2x.png?t=" + new Date().getTime();
				setTimeout(() => {
					// 停止下拉刷新
					wx.stopPullDownRefresh();
				}, 1000);
			
			},
			init() {
				this.$apiCom.userinfo({
					elderId: this.binduser.id,
					isLoad:true
				}).then(res => {
					if (res.code == 0) {
						this.userinfo={}
						this.userinfo = res.data
						let user = this.userInfo
						user.identity = res.data.identity
						user.isAdmin = res.data.isAdmin
						user.phoneNo = res.data.phoneNo
						user.isSubscribe = res.data.isSubscribe
						user.id = res.data.id
						this.$store.commit("user/SET_USER_INFO",
							user)
					}
					this.isRequired=true
				})
				this.$apiCom.getChild({isLoad:true}).then(res => {
					if (res.code == 0) {
						this.childrenList = res.data
					}
				})

			},
			bindBtn() {
				this.$refs.bindDialog.open();
			},
			closebindDialog() {
				this.$refs.bindDialog.close();
			},
			confirmbindDialog() {
				this.$fun.clear()
				this.$store.commit("user/CLEAR_BINDUSER", {id:null});
				this.$refs.bindDialog.close();
				uni.redirectTo({
					url: '/pages/login/login'
				});
			},
			godetail(val,ind) {
				if(ind==0&&(this.userinfo.isAnonymous||uni.getStorageSync('isLoginTest'))){
					this.bindBtn()
					return
				}
				uni.navigateTo({
					url: val
				})
			},
			gofamily(val) {
				uni.navigateTo({
					url: '/page_writeOff/family/family?elderId=' + val.id
				})
			},
			gomineinfo() {
				let detailinfo = {
					avatarUrl: this.userinfo.avatarUrl,
					identity: this.userinfo.identity,
					phoneNo: this.userinfo.phoneNo,
					id: this.userinfo.id,
					isAnonymous: this.userinfo.isAnonymous,
					isAdmin: this.userinfo.isAdmin,
					chiledNum:this.userinfo.elder.length
				}
				let info = encodeURIComponent(JSON.stringify(detailinfo))
				uni.navigateTo({
					url: '/page_detail/mineInfo/mineInfo?info=' + info
				})
			},
			getPhoneNumber(e) {
				if (!e.detail.code) {
					return
				}
				this.$apiCom.requestphone({
					code: e.detail.code
				}).then(res => {
					if (res.code == 0) {
						this.init()
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				})
			},
			editBtn(val) {
				let obj={...val,elderNum:this.childrenList.length}
				let childInfo = encodeURIComponent(JSON.stringify(obj))
				uni.navigateTo({
					url: '/page_detail/devicedetail/devicedetail?childInfo=' + childInfo
				})
			},
			goMember(val) {
				let childInfo = encodeURIComponent(JSON.stringify(val))
				uni.navigateTo({
					url: '/page_writeOff/member/member?childInfo='+childInfo,
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.minePage {
		background-color: #F5f5f5;
		height: 100%;
	}

	.homeHead {
		width: 100%;
		height: 434rpx;
		background: #E7F3FF;
		border-radius: 32rpx;
		position: relative;
		.bgImg {
			width: 100%;
			height: 100%;
		}

		.userBox {
			position: absolute;
			top: 176rpx;
			left: 280rpx;
			width: 190rpx;
			box-sizing: border-box;

			.userimg {
				width: 104rpx;
				height: 104rpx;
				border-radius: 50%;
				margin-bottom: 16rpx;
				box-sizing: border-box;
			}
		}
	}

	.mainBox {
		padding-top: 20rpx;
		background-color: #F5f5f5;
		// position: relative;
		min-height: calc(100vh - 434rpx);
		flex-grow: 1;
		overflow: overlay;
		margin-top: -60rpx;
		padding-left: 40rpx;
		
.isvipMember{
	background: #FFE8C2;
}
.novipMember{
	background: #E7E7E7;
}
		.member {
			width: 670rpx;
			height: 100rpx;
			border-radius: 32rpx 32rpx 0rpx 0rpx;
			padding-right: 32rpx;
			margin: 0rpx 0rpx 15rpx 40rpx;
			color: #AF6309;
			.memberPng {
				width: 56rpx;
				height: 30rpx;
				margin:0 26rpx 0 38rpx;
			}
		}
        .contentBox{
			z-index: 2;
		}
		.childBox {
			width: 670rpx;
			border-radius: 32rpx;
			padding: 42rpx 32rpx;
			margin: 0rpx 0 20rpx 0rpx;

			.userList {
				.userinfo {
					.userpng {
						width: 88rpx;
						height: 88rpx;
						border-radius: 50%;
						margin-right: 16rpx;
					}
				}

				.editBtn {
					width: 112rpx;
					height: 56rpx;
					border-radius: 28rpx;
					background-color: rgba(216, 216, 216, 0.25);
				}

				.scanImg {
					width: 40rpx;
					height: 40rpx;
				}

				.iconpng {
					width: 48rpx;
					height: 48rpx;
					margin-right: 20rpx;
				}

				.setItem {
					padding: 40rpx 0;
				}
			}

		}

		.setBox {
			width: 670rpx;
			border-radius: 32rpx;
			padding: 20rpx 32rpx;
			margin: 16rpx 0 16rpx 0rpx;

			.iconpng {
				width: 48rpx;
				height: 48rpx;
				margin-right: 20rpx;
			}

			.setItem {
				padding: 40rpx 0;
			}
		}
	}

	.footimg {
		width: 750rpx;
		height: 200rpx;
		display: block;
	}

	.getphoneBtn {
		border: none;
		height: 54rpx;
		box-sizing: border-box;
		margin-top: 8rpx;
		background-color: #2979ff;
		color: #fff;
	}

	.mt4 {
		margin-top: 4rpx;
	}
	/deep/ .uni-button-color {
		color: #2979ff;
	}
</style>
