<template>
	<view class="">
		<view class="viewBox">
			<view class="navBarContent" :style="{ backgroundColor: customColor }">
				<view class="headBox" :style="[
            { height: customBar + 'px' },
            { 'line-height': customBar + 20 + 'px' },
          ]">
					<view class="new-top">
						<view class="">
							<view class="color0 backBtn">亲情关怀</view>
							<view class="disfr ac gifBox" @click="scanCode" :style="{ left: boundingLeft + 'px' }">
								<image src="https://hsapmarket.zy845.com/guard/wx/icon_scan.png" mode=""
									class="icongif"></image>
							</view>
						</view>
					</view>
				</view>
			</view>

			<scrolllist ref="list" @load="load" @scroll="getScroll" @refresh="refresh(false, true)">
				<view class="homePage">
					<view class="homeHead">
						<image class="bgImg" src="https://hsapmarket.zy845.com/guard/wx/homeBg.png"></image>
						<view class="userBox">
							<view class="userimgName borderbox djb ac">
								<view class="borderbox disfr ac wi88">
									<view class="childAvatarBox">
										<view v-show="
                        bindChildreninfo.device.networkState == 'disconnect'
                      " class="disconnect networkState"></view>
										<view v-show="
                        bindChildreninfo.device.networkState == 'connected'
                      " class="connected networkState"></view>
										<image :src="bindChildreninfo.avatarUrl" class="userimg"
											v-if="bindChildreninfo.avatarUrl && imageVisible"
											@click="gochildPage(bindChildreninfo)">
										</image>
										<image src="https://apmarket.tt286.com/teeny/icon/unknown2x.png" class="userimg"
											v-if="!bindChildreninfo.avatarUrl" @click="gochildPage(bindChildreninfo)">
										</image>
									</view>
									<view class="fc">
										<view class="disfr ac">
											<text class="userName ell fw400 color0"
												@click="gochildPage(bindChildreninfo)">{{ bindChildreninfo.nickName || "暂未绑定老人" }}</text>
											<image v-if="imageVisible"
												src="https://hsapmarket.zy845.com/guard/wx/btn_exchange@2x.png"
												class="scanImg changeBTN" @click="changechild"></image>
										</view>
										<view class="disfr ac ml20">
											当前状态：<text class="fz28 fw400" :class="[
                          bindChildreninfo.device.currentState == 'unlock'
                            ? 'color17B'
                            : 'color9',
                        ]">{{
                          bindChildreninfo.device.currentState == "locked"
                            ? "已锁屏"
                            : bindChildreninfo.device.currentState == "unlock"
                            ? "已解锁"
                            : bindChildreninfo.device.model
                            ? "已绑定设备"
                            : "未绑定设备"
                        }}</text>
											| 剩余电量：{{
                        (electricChartData.series &&
                          electricChartData.series[0].data) ||
                        0
                      }}%
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="menuBox bgcF disfr flexWrap borderbox">
						<view class="menuItem fc ac borderbox" v-for="(item, index) in menuArray" :key="index"
							@click="goDetailPage(item)">
							<view v-if="imageVisible" :class="['menuImg', 'menuItem' + (index + 1)]">
								<image class="img" :src="
                    !bindChildreninfo.premium ||
                    bindChildreninfo.premium.state != 'active'
                      ? item.disabledImg
                      : item.img
                  ">
								</image>
							</view>
							<view class="color3 fw400 fz28 menuName borderbox">
								{{ item.menuName }}
							</view>
						</view>
					</view>

					<view class="mainBox">
						<view class="curLoc">
							<text class="curLocTitle"> 当前位置 </text>
							<text class="curLocTime">
								{{
                  formatDateFromNow(
                    bindChildreninfo.device &&
                      bindChildreninfo.device.lastConnectTime
                  )
                }}
							</text>
						</view>

						<view @click="goMapPage" class="mainContentBox">
							{{
                (bindChildreninfo &&
                  bindChildreninfo.location &&
                  bindChildreninfo.location.address) ||
                ""
              }}
						</view>

						<view @click="goMapPage" class="mapBox">
							<map class="map" id="map" :longitude="longitude" :latitude="latitude" :enable-zoom="false"
								:enable-scroll="false" :markers="markers">
							</map>
						</view>

						<view class="curLocBtns">
							<view class="btn-common btnNav" @click="navigation">导航</view>
							<view class="btn-common btnCall" @click="callphone">
								拨打电话
							</view>
						</view>
					</view>
				</view>
			</scrolllist>
			<view class="bindingBox disfr ac jsb" v-if="bindUserInfo.isAnonymous">
				<text>当前为试用模式，绑定后可体验完整功能</text>
				<view class="bindBtn cof dja bgc17B" @click="bindBtn"> 立即绑定 </view>
			</view>
			<uni-popup ref="bindDialog" type="dialog">
				<uni-popup-dialog mode="base" title=" " content="当前为试用模式,绑定后可体验完整功能" :before-close="true"
					@close="closebindDialog" @confirm="confirmbindDialog" cancelText="继续试用" confirmText="立即绑定">
				</uni-popup-dialog>
			</uni-popup>
			<uni-popup ref="popup" background-color="#fff">
				<view class="radioUserBox fc fz30 color3 borderbox">
					<radio-group @change="radioChange">
						<label :class="[
                'disfr ac jsb childItm borderbox',
                index === current ? 'currentSelected' : '',
              ]" class="" v-for="(item, index) in userList" :key="item.value">
							<view class="disfr ac">
								<image :src="item.avatarUrl" mode="" class="childimg"></image>
								<text>{{ item.nickName }}</text>
							</view>
							<view>
								<radio :value="item.id" :checked="index === current" style="transform: scale(0.8)"
									color="#0066FF" />
							</view>
						</label>
					</radio-group>
					<label class="childItm borderbox disfr color17B ac addfacilitybox" @click="addfacilityBtn">
						<image src="https://hsapmarket.zy845.com/guard/wx/add2x-1.png" mode="" class="addicon"></image>
						<view class="fw600">添加设备</view>
					</label>
				</view>
			</uni-popup>
			<!-- 首个家长绑定成功弹窗 -->
			<uni-popup ref="bindPopup" type="primary" background-color="#fff" :mask-click="false">
				<view class="bind-content fc ac">
					<view class="pountBox">
						<image src="https://apmarket.tt286.com/teeny/icon/binding2x.png" mode="" class="pountPng">
						</image>
					</view>
					<view class="color3 puountTitle fw600">恭喜绑定成功</view>
					<view class="color6 pountdesc">您已成功绑定老人【{{
              firstChildName
            }}】的设备。您可以根据老人的年龄为老人定制可用时长、停用时间等使用限制哦。
					</view>
					<view class="color9 fz24 disfr ac">
						<radio value="isdefaultdata" :checked="isdefault" style="transform: scale(0.5)"
							@click="changeRadio(isdefault)" />同意我们为老人手机设置默认值
					</view>
					<button type="default" class="btn fw600 fz32" @click="bindPopupClose">
						开始使用
					</button>
				</view>
			</uni-popup>
			<uni-popup ref="follow" type="primary" background-color="#fff">
				<Follow @followClose="followClose"></Follow>
			</uni-popup>
			<uni-popup ref="memberPoup" type="center" :is-mask-click="false" @touchmove.stop.prevent>
				<MemberPoup v-if="membeType == 'express'" type="express" text="该设备会员已到期，续费后才可继续使用管控功能"
					@renewBtn="renewBtn" @closeMember="closeMember"></MemberPoup>
				<MemberPoup v-if="membeType == 'remind'" type="remind" :text="textDesc" @renewBtn="renewBtn"
					@closeMember="closeMember"></MemberPoup>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		bd09togcj02
	} from "@/utils/coordinateConversion.js";
	import Follow from "@/components/follow/follow.vue";
	import uCharts from "@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js";
	import MemberPoup from "@/components/memberPoup/memberPoup.vue";
	import scrolllist from "@/components/scroll-list/scroll-list.vue";
	import {
		mapGetters
	} from "vuex";
	import {
		formatDateFromNow
	} from "@/libs/util.js";

	export default {
		components: {
			Follow,
			MemberPoup,
			scrolllist,
		},
		computed: {
			...mapGetters(["userInfo", "binduser"]), //获取vuex中存的数据
		},
		data() {
			return {
				initOpactity: 0, // 初始透明度
				customColor: "transparent",
				customBar: "",
				boundingLeft: 400, // 菜单按钮距离左边界距离

				loa: [],
				latitude: "", //当前位置纬度
				longitude: "", //当前位置经度
				markers: [],
				bd09togcj02,

				imageVisible: false, // 断网时网络图片显示
				Imgphone: "https://apmarket.tt286.com/teeny/icon/iconphone2x.png", //手机
				membeType: "express", //会员类型
				firstChildName: "",
				textDesc: "“小宝贝”的设备VIP仅剩余7天，过期后管控功能、实时定位、应用使用记录等功能均不可使用，建议您立即续费",
				weekFirt: this.$fun.weekFirt(), //本周第一天 周一
				weekLast: this.$fun.weekLast(), //本周最后一天 周日
				WeekStartDate: this.$fun.getLastWeekStartDate(), //上周第一天 周一
				WeekEndDate: this.$fun.getLastWeekEndDate(), //上周最后一天 周日
				isdefaultdata: null, // 同意我们为老人手机设置默认值
				isdefault: true, //是否同意设置默认值
				timeEmpty: true,
				bindUserInfo: {}, //当前登录的用户信息
				bindChildreninfo: {
					id: "",
				}, //当前用户选择的绑定的老人信息
				earphoneData: {
					info: {
						earphoneData: "",
						totalDuration: "",
					},
					tooHigh: "",
					averageVolume: "",
				}, //耳机数据
				userList: [], //老人列表
				current: 0, //选择老人的下标
				menuArray: this.$constant.menuArray,
				tabSelected: 0, //选中的tab下标
				electricChartData: {}, //电量图表数据
				opts: {
					title: {
						name: "0",
						fontSize: 22,
						color: "#2fc25b",
					},
					subtitle: {
						name: "剩余电量",
						fontSize: 11,
						color: "#666666",
					},
					extra: {
						arcbar: {
							type: "circle", //圆弧进度图样式，可选值："default"半圆弧模式,"circle"整圆模式
							width: 6, //圆弧进度图弧线宽度
							backgroundColor: "#D1F6E5", //圆弧进度图背景颜色
							startAngle: 1.5, //圆弧进度图起始角度，0-2之间，0为3点钟位置，0.5为6点钟，1为9点钟，1.5为12点钟，默认0.75
							endAngle: 0.25, //圆弧进度图结束角度，0-2之间，0为3点钟位置，0.5为6点钟，1为9点钟，1.5为12点钟，默认0.25
							gap: 2, //圆弧进度条的间隔单位px
						},
					},
				},
				isScanClicked: false, // 扫一扫
				isTabBtnClicked: false,
			};
		},
		onShow() {
			let tabIndex = uni.getStorageSync("homeTabSelected") ?
				uni.getStorageSync("homeTabSelected") :
				0;
			this.tabSelected = tabIndex;
			if (!uni.getStorageSync("isSan")) {
				//解决没有绑定老人的情况下 第一次通过扫码绑定老人的时候请求数据有个错误提示的问题
				this.init();
			}
			uni.setStorageSync("isSan", false);
		},
		onLoad() {
			if (getApp().globalData.isStartUse && uni.getStorageSync("token")) {
				this.refresh({
					isNoShowError: true,
				});
				getApp().globalData.isStartUse = false;
			}
		},
		onHide() {
			this.$refs.popup.close();
			this.$refs.follow.close();
		},
		created() {
			this.customBar = getApp().globalData.customBar;

			const bounding = uni.getMenuButtonBoundingClientRect();
			this.boundingLeft = bounding.left - bounding.width / 2;
		},
		mounted() {
			this.imageVisible = false; // 隐藏图片
			setTimeout(() => {
				this.imageVisible = true; // 1秒后再尝试加载
			}, 100);
			uni.onNetworkStatusChange((res) => {
				if (res.isConnected) {
					this.refreshImages();
					this.init();
				}
			});
		},
		methods: {
			formatDateFromNow,
			getScroll(e) {
				// console.log(e);

				// 背景色逐渐设置为白色
				if (e.scrollTop > 30 && e.scrollTop < 150) {
					// 计算透明度，范围从0到1
					const opacity = Math.min((e.scrollTop - 30) / 120, 1); // 从30到150之间的滚动变化
					this.initOpactity = opacity; // 更新透明度值

					// 设置背景颜色
					this.customColor = `rgba(255, 255, 255, ${this.initOpactity})`;
				} else if (e.scrollTop <= 30) {
					// 在30以下保持透明
					this.initOpactity = 0;
					this.customColor = "transparent";
				} else {
					// 超过150时保持纯白
					this.initOpactity = 1;
					this.customColor = "rgba(255, 255, 255, 1)";
				}
			},
			navigation() {
				if (this.isTabBtnClicked) {
					uni.showToast({
						title: "不可重复操作",
						icon: "none",
					});
					return;
				}
				if (uni.getStorageSync("network") == "no") {
					uni.showToast({
						title: "请检查网络连接",
						icon: "none",
					});
					return;
				}
				if (this.bindUserInfo.isAnonymous) {
					this.$refs.bindDialog.open();
					return;
				}
				wx.getSystemInfo({
					success: (res) => {
						if (res.platform === "windows" || res.platform === "mac") {
							// PC端代码
							uni.showToast({
								title: "请使用真机导航",
								icon: "none",
							});
							return;
						}
					},
				});
				this.isTabBtnClicked = true;
				setTimeout(() => {
					this.isTabBtnClicked = false;
					uni.openLocation({
						latitude: this.latitude, //目标纬度
						longitude: this.longitude, //目标经度
						address: this.binduser.location.address || "", //地址
						scale: 28,
					});
				}, 1000);
			},
			callphone() {
				if (uni.getStorageSync("network") == "no") {
					uni.showToast({
						title: "请检查网络连接",
						icon: "none",
					});
					return;
				}
				if (this.bindUserInfo.isAnonymous) {
					this.$refs.bindDialog.open();
					return;
				}
				wx.getSystemInfo({
					success: (res) => {
						if (res.platform === "windows" || res.platform === "mac") {
							// PC端代码
							uni.showToast({
								title: "请使用真机拨打电话",
								icon: "none",
							});
							return;
						}
					},
				});
				uni.makePhoneCall({
					phoneNumber: this.bindChildreninfo.phoneNo,
				});
			},
			goMapPage() {
				uni.navigateTo({
					url: "/pages/place/place",
				});
			},
			// 网络恢复时刷新图片
			refreshImages() {
				this.bindChildreninfo.avatarUrl += "?t=" + new Date().getTime();
				this.Imgphone =
					"https://apmarket.tt286.com/teeny/icon/iconphone2x.png?t=" +
					new Date().getTime();
				this.headimg =
					"https://apmarket.tt286.com/teeny/icon/imgearphone2x.png?t=" +
					new Date().getTime();
				// 尝试重新加载图片
				this.imageVisible = false; // 隐藏图片
				setTimeout(() => {
					this.imageVisible = true; // 1秒后再尝试加载
				}, 100);
			},
			// 刷新数据
			refresh(isNoShowError, isshowH) {
				// isNoShowError为true表示是onload里面执行的 isshowH是否下拉刷新执行的操作
				this.$apiCom
					.homeRefresh(this.binduser.id || "", {})
					.then((res) => {
						// this.init()
						if (res.code == 0) {
							this.tabSelected = 0;
							this.init();
							this.$refs.list.refreshSuccess({
								list: [],
								total: 50,
							});
						} else {
							if (!isNoShowError || (res.code != 3014 && res.code != 3006)) {
								//第一次进入小程序刷新失败不显示错误信息
								if (!isNoShowError && !this.binduser.id) {
									//发起绑定跳转到首页后 管理员通过后在首页下拉刷新 不显示报错信息
								} else {
									uni.showToast({
										title: res.msg,
										icon: "none",
										duration: 2000,
									});
								}
							}
							if (isshowH && res.code == 3014) {
								if (!this.binduser.id) {
									//发起绑定跳转到首页后 管理员通过后在首页下拉刷新
									this.init();
								} else {
									uni.showToast({
										title: "会员已到期，请续费后再试",
										icon: "none",
										duration: 2000,
									});
								}
							}
							if ([3010, 3016, 3006].includes(res.code)) {
								this.init();
							}
							this.$refs.list.refreshFail({
								list: [],
								total: 50,
							});
						}
					})
					.catch((err) => {
						this.$refs.list.refreshFail({
							list: [],
							total: 50,
						});
						this.init();
					});
			},
			// 加载数据
			load() {
				this.$refs.list.loadSuccess({
					list: [],
					total: 50,
				});
			},
			init() {
				this.$apiCom
					.userinfo({
						elderId: this.binduser.id || "",
						isLoad: true,
					})
					.then((res) => {
						if (res.code == 0) {
							this.bindUserInfo = res.data;
							//从绑定页面过来时的弹框判断
							if (getApp().globalData.isFirstBind == 1) {
								//1表示第一次绑定 2表示不是第一次绑定
								// getApp().globalData.isFirstBind = false
								let childobj = res.data.elder.find(
									(item) => item.id == getApp().globalData.elderId
								);
								this.firstChildName = childobj.nickName;
								this.bindPopupClose(); //上一行代码有弹框 这一行没有弹框 实现的功能一样
							} else if (getApp().globalData.isFirstBind == 2) {
								if (!res.data.isSubscribe) {
									//没有关注公众时的弹框
									this.$refs.follow.open("center");
								}
							}
							this.userList = res.data.elder;
							if (!this.binduser.id) {
								this.bindChildreninfo = res.data.elder[0] || {
									id: "",
								};
								this.current = 0; //切换老人列表时为第一个老人
								let user = this.userInfo;
								user.identity = res.data.identity;
								user.isAdmin = res.data.isAdmin;
								user.phoneNo = res.data.phoneNo;
								user.isSubscribe = res.data.isSubscribe;
								user.id = res.data.id;
								this.$store.commit("user/SET_USER_INFO", user);
								this.$store.commit("user/SET_BINDUSER", this.bindChildreninfo);
							} else {
								let childObj;
								if (getApp().globalData.isFirstBind == 1) {
									//设备第一次绑定时切换到最新绑定的老人
									childObj = this.userList.find(
											(item) => item.id == getApp().globalData.elderId
										) ||
										res.data.elder[0] || {
											id: "",
											premium: {
												state: "inactive",
											},
										};
									this.current = this.userList.findIndex(
										(item) => item.id == getApp().globalData.elderId
									);
									this.$store.commit(
										"user/SET_BINDUSER",
										this.userList[this.current]
									);
								} else {
									let that = this;
									childObj = this.userList.find(
											(item) => item.id == that.binduser.id
										) ||
										res.data.elder[0] || {
											id: "",
											premium: {
												state: "inactive",
											},
										};
									this.current = this.userList.findIndex(
										(item) => item.id == that.binduser.id
									);
								}
								this.bindChildreninfo = childObj;
							}
							getApp().globalData.isFirstBind = false;
							uni.setStorageSync("X-Child-Id", this.bindChildreninfo.id || "");
							if (res.data.elder.length > 0) {
								this.batterycapData(this.bindChildreninfo.device.batteryCap); //电量图表
							} else {
								this.batterycapData(0); //电量图表
							}
							this.IsShowMemberPoup(); //会员提醒弹框

							if (
								this.bindChildreninfo.location &&
								this.bindChildreninfo.location.latitude &&
								this.bindChildreninfo.location.longitude
							) {
								this.loa = [
									Number(this.bindChildreninfo.location.latitude),
									Number(this.bindChildreninfo.location.longitude),
								];
							} else {
								this.loa = [31.177543, 121.416665];
							}
							this.latitude = this.loa[0];
							this.longitude = this.loa[1];
							this.markers = [{
								id: 1,
								latitude: this.latitude,
								longitude: this.longitude,
								width: 45, // 添加宽度
								height: 60, // 添加高度
								iconPath: "https://hsapmarket.zy845.com/guard/wx/parent.png",
							}, ];
						} else {
							if (res.code != 3014) {
								uni.showToast({
									title: res.msg,
									icon: "none",
								});
							}
							//从绑定页面过来时的弹框判断
							if (getApp().globalData.isFirstBind == 1) {
								getApp().globalData.isFirstBind = false;
								this.bindPopupClose(); //上一行代码有弹框 这一行没有弹框 实现的功能一样
							} else if (getApp().globalData.isFirstBind == 2) {
								getApp().globalData.isFirstBind = false;
								if (!res.data.isSubscribe) {
									//没有关注公众时的弹框
									this.$refs.follow.open("center");
								}
							}
						}
					});
			},
			//会员提醒弹框
			IsShowMemberPoup() {
				if (
					this.bindChildreninfo.premium &&
					this.bindChildreninfo.premium.state == "active"
				) {
					if (
						this.$fun.isMemberPoup(this.bindChildreninfo.premium.expireAt).isremid
					) {
						this.membeType = "remind";
						this.textDesc = `"${this.bindChildreninfo.nickName}"的设备VIP仅剩余${
            this.$fun.isMemberPoup(this.bindChildreninfo.premium.expireAt).day
          }天，过期后管控功能、实时定位、应用使用记录等功能均不可使用，建议您立即续费`;
						this.$refs.memberPoup.open("center");
					}
				} else {
					if (this.bindChildreninfo.id) {
						this.membeType = "express";
						this.$refs.memberPoup.open("center");
					}
				}
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.userList.length; i++) {
					if (this.userList[i].id == evt.detail.value) {
						this.$apiCom
							.childrenCheckout({
								elderId: Number(evt.detail.value),
							})
							.then((res) => {
								console.log(res);
							});
						this.bindChildreninfo = this.userList[i];
						uni.setStorageSync("X-Child-Id", this.bindChildreninfo.id || "");
						this.batterycapData(this.userList[i].device.batteryCap);
						this.$store.commit("user/SET_BINDUSER", this.userList[i]);
						this.current = i;
						this.$refs.popup.close();
						this.tabSelected = 0;
						this.IsShowMemberPoup(); //会员提醒弹框
						break;
					}
				}
			},
			bindBtn() {
				this.$refs.bindDialog.open();
			},
			closebindDialog() {
				this.$refs.bindDialog.close();
			},
			// 立即绑定
			confirmbindDialog() {
				this.$fun.clear();
				this.$store.commit("user/CLEAR_BINDUSER", {
					id: null,
				});
				this.$refs.bindDialog.close();
				uni.redirectTo({
					url: "/pages/login/login",
				});
			},
			// 添加设备
			addfacilityBtn() {
				this.$refs.popup.close();
				if (uni.getStorageSync("isLoginTest") || this.bindUserInfo.isAnonymous) {
					this.bindBtn();
					return;
				}
				uni.navigateTo({
					url: "/page_writeOff/binddevice/binddevice",
				});
			},
			goDetailPage(val) {
				if (
					!this.bindChildreninfo.premium ||
					this.bindChildreninfo.premium.state != "active"
				) {
					return;
				}
				uni.navigateTo({
					url: val.url,
				});
			},
			scanCode() {
				if (this.isScanClicked) {
					uni.showToast({
						title: "不可重复操作",
						icon: "none",
					});

					return;
				}
				this.isScanClicked = true;
				if (this.bindUserInfo.isAnonymous || uni.getStorageSync("isLoginTest")) {
					uni.showToast({
						title: "试用模式下不可绑定",
						icon: "none",
						duration: 3000,
					});
					return;
				}
				let that = this;
				setTimeout(() => {
					uni.setStorageSync("isSan", true);
					uni.scanCode({
						scanType: ["qrCode"],
						success: function(res) {
							that.isScanClicked = false;
							let s = !/^\d{1,6}$/.test(res.result);
							if (s) {
								uni.showToast({
									title: "绑定码获取失败",
									icon: "none",
								});
								return;
							}
							that.getBoundDevice({
								code: res.result,
							});
						},
						fail: (err) => {
							uni.showToast({
								title: "扫码失败",
								icon: "none",
							});
							that.isScanClicked = false;
						},
					});
				}, 1000);
			},
			getBoundDevice(obj) {
				this.$apiCom.getBoundDevice(obj).then((res) => {
					if (res.code == 0) {
						let dataObj = res.data;
						if (res.data.gender == 2) {
							dataObj.showData = "女";
						} else if (res.data.gender == 1) {
							dataObj.showData = "男";
						} else {
							dataObj.showData = "";
						}
						dataObj.deviceCode = obj.code;
						let list = encodeURIComponent(JSON.stringify(dataObj));
						uni.navigateTo({
							url: "/page_detail/setchildinfo/setchildinfo?list=" + list,
						});
					} else if (res.code == 3013) {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 2000,
						});
						return;
					} else {
						let type = encodeURIComponent(
							JSON.stringify({
								type: true,
								deviceCode: obj.code,
							})
						);
						uni.navigateTo({
							url: "/page_detail/setchildinfo/setchildinfo?list=" + type,
						});
					}
				});
			},
			//获取耳机数据
			async earphoneList(starttime, endttime) {
				let obj = {
					elderId: this.bindChildreninfo.id,
					startTime: starttime,
					endTime: endttime,
					isLoad: true,
				};
				let res = await this.$apiCom.earphoneInfo(obj);
				if (res.code == 0 && res.data) {
					this.earphoneData = res.data;
				} else {
					this.earphoneData = {
						info: {
							earphoneData: "",
							totalDuration: "",
						},
						tooHigh: "",
						averageVolume: "",
					}; //耳机数据
				}
			},
			// 电量图表
			batterycapData(val) {
				let res1 = {
					series: [{
						name: "剩余电量",
						color: "#2fc25b",
						data: 0,
					}, ],
				};
				if (val || val == 0) {
					res1.series[0].data = Number(val);
					this.opts.title.name = val.toString();
				} else {
					this.opts.title = {
						name: "0",
						fontSize: 30,
						color: "#2fc25b",
					};
				}
				this.electricChartData = JSON.parse(JSON.stringify(res1));
			},
			// 第一个家长绑定成功开始使用
			bindPopupClose() {
				if (this.isdefault) {
					this.$apiCom
						.initconfig({
							elderId: getApp().globalData.elderId,
						})
						.then((res) => {
							if (res.code == 0) {
								getApp().globalData.isFirstBind = false;
								getApp().globalData.elderId = null;
								this.$refs.bindPopup.close();
							} else {
								if (res.code != 3014) {
									uni.showToast({
										title: res.msg,
										icon: "none",
									});
								}
							}
						});
				} else {
					getApp().globalData.isFirstBind = false;
					getApp().globalData.elderId = null;
					this.$refs.bindPopup.close();
				}
			},
			changeRadio(val) {
				this.isdefault = !val;
			},
			changechild() {
				this.$refs.popup.open("center");
			},
			closeMember() {
				this.$refs.memberPoup.close();
			},
			// 续费
			renewBtn() {
				if (!this.bindChildreninfo.id) {
					uni.showToast({
						title: "请先绑定老人",
						icon: "none",
						duration: 2000,
					});
					return;
				}
				this.$refs.memberPoup.close();
				let childInfo = encodeURIComponent(JSON.stringify(this.bindChildreninfo));
				uni.navigateTo({
					url: "/page_writeOff/buy/buy?childInfo=" + childInfo,
				});
			},
			gochildPage(val) {
				if (!val.nickName) {
					return;
				}
				let childInfo = encodeURIComponent(JSON.stringify(val));
				uni.navigateTo({
					url: "/page_detail/devicedetail/devicedetail?childInfo=" + childInfo,
				});
			},
			followClose() {
				this.$refs.follow.close();
			},
		},
		onPullDownRefresh() {
			this.$apiCom.homeRefresh(this.binduser.id || "", {}).then((res) => {
				if (res.code == 0) {
					this.tabSelected = 0;
					this.init();
				} else {
					if (res.code != 3014) {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 2000,
						});
					}
				}
				uni.stopPullDownRefresh();
			});
		},
	};
</script>

<style lang="scss" scoped src="@/common/css/util.scss"></style>
<style lang="scss" scoped src="./home.scss"></style>