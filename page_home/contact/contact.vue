<template>
	<view class="contact wx_flex_container">
		<view class="white-box">
			<view class="form-label big-title">手动添加</view>

			<view class="form-item">
				<view class="form-label">联系人姓名</view>
				<input type="text" placeholder="请输入联系人姓名" class="form-input" v-model="userInfo.name" />
			</view>

			<view class="form-item" v-for="(item, index) in userInfo.telList" :key="index">
				<view class="form-label">手机号码</view>
				<view class="form-box">
					<input type="text" placeholder="请输入手机号码" class="form-input" v-model="item.tel" maxlength="11" />
					<image v-if="userInfo.telList.length > 1" class="btnclose"
						src="https://apmarket.tt286.com/teeny/icon/btnclose2x.png" mode="" @click="closeTel(index)">
					</image>
				</view>
			</view>

			<view class="btn-add" @click="addTel()">
				<image src="https://hsapmarket.zy845.com/guard/wx/add2x-1.png" mode="" class="addicon"></image>
				<text>添加号码</text>
			</view>
		</view>

		<view class="white-box mb40" v-if="!userInfo.id">
			<view class="flatBox paddingN" @click="showWxChooseContact">
				<view class="flatItem">
					<text class="flatTitle">从通讯录获取</text>
				</view>
				<image class="arrowImg" src="https://apmarket.tt286.com/teeny/icon/arrow2x.png"></image>
			</view>
		</view>

		<view class="footer-box" v-if="userInfo.id">
			<view class="btn-blue btn-red" @click="deleteContact">删除</view>
			<view class="btn-blue" @click="submit">保存</view>
		</view>

		<view class="footer-box" v-else>
			<view class="btn-blue" @click="submit">保存</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	export default {
		data() {
			return {
				userInfo: {
					name: "",
					telList: [{
						tel: "",
					}, ],
				},
			};
		},
		computed: {
			...mapGetters(["binduser"]), //获取vuex中存的数据
		},
		mounted() {
			// 获取URL参数
			let pages = getCurrentPages(); //获取页面栈数组
			let page = pages[pages.length - 1]; //获取当前页面对象
			let route = page.route; //获取当前页面路由
			//在微信小程序或是app中，通过page.options；如果是H5，则需要page.route.query（H5中的page.options为undefined）
			let params = page.options || page.route.query;

			if (params.id) {
				this.userInfo.id = parseInt(params.id);
			}
			if (params.name) {
				this.userInfo.name = params.name;
			}
			if (params.telList) {
				this.userInfo.telList = params.telList.split(",").map((item) => {
					return {
						tel: item,
					};
				});
			}
		},
		methods: {
			addTel(){
				if(this.userInfo.telList.length >= 10){
					uni.showToast({
						title: "最多只能添加10个手机号码",
						icon: "none",
						duration: 3000,
					});
					return 
				}
				this.userInfo.telList.push({ tel: '' })
			},
			closeTel(index) {
				this.userInfo.telList.splice(index, 1);
			},
			deleteContact() {
				if (uni.getStorageSync("isLoginTest")) {
					uni.showToast({
						title: "请绑定老人设备后再进行操作",
						icon: "none",
					});
					return;
				}
				// 弹窗
				const that = this;
				uni.showModal({
					title: "提示",
					content: "删除后,该联系人无法联系老人,确认要删除该白名单联系人吗?",
					success: (wxres) => {
						if (wxres.confirm) {
							console.log("用户点击确定");

							that.$apiCom
								.contactsUnionApi("DELETE", {
									id: parseInt(this.userInfo.id),
									elderId: this.binduser.id || 0,
								})
								.then((res) => {
									if (res.code != 0) {
										uni.showToast({
											title: res.msg,
											icon: "none",
										});
									} else {
										uni.showToast({
											title: "删除成功",
											icon: "none",
										});
										uni.navigateBack();
									}
								})
								.catch((err) => {
									uni.showToast({
										title: "暂无网络连接",
										icon: "none",
									});
								});
						} else if (wxres.cancel) {
							console.log("用户点击取消");
						}
					},
				});
			},
			showWxChooseContact() {
				if (uni.getStorageSync("isLoginTest")) {
					uni.showToast({
						title: "请绑定老人设备后再进行操作",
						icon: "none",
					});
					return;
				}
				uni.chooseContact({
					complete: (e) => {
						console.log(e);
						if (e.phoneNumber && e.displayName) {
							this.userInfo.name = e.displayName;
							this.userInfo.telList = [{
								tel: e.phoneNumber,
							}, ];
						}
					},
				});
			},
			submit() {
				if (uni.getStorageSync("isLoginTest")) {
					uni.showToast({
						title: "请绑定老人设备后再进行操作",
						icon: "none",
					});
					return;
				}
				if (this.userInfo.name.length < 2) {
					uni.showToast({
						title: "请填写正确的联系人姓名",
						icon: "none",
						duration: 3000,
					});
					return;
				} else if (this.userInfo.name.length > 10) {
					uni.showToast({
						title: "联系人姓名不可超过10个字符，请重新输入",
						icon: "none",
						duration: 3000,
					});
					return;
				}

				let phoneError = false;
				this.userInfo.telList.forEach((item) => {
					if (item.tel == "") {
						phoneError = true;
						uni.showToast({
							title: "请填写手机号码",
							icon: "none",
							duration: 3000,
						});
						return;
					} else if (!/^1\d{10}$/.test(item.tel)) {
						phoneError = true;
						uni.showToast({
							title: "请输入正确的手机号码",
							icon: "none",
							duration: 3000,
						});
						return;
					}
				});

				if (phoneError) return;

				let obj = JSON.parse(JSON.stringify(this.userInfo));
				obj.elderId = this.binduser.id || 0;
				obj.telList = obj.telList.map((item) => item.tel);

				this.$apiCom
					.contactsUnionApi(obj.id ? "PUT" : "POST", obj)
					.then((res) => {
						if (res.code != 0) {
							uni.showToast({
								title: res.msg,
								icon: "none",
							});
						} else {
							uni.showToast({
								title: "编辑成功",
								icon: "none",
							});
							uni.navigateBack();
						}
					})
					.catch((err) => {
						uni.showToast({
							title: "暂无网络连接",
							icon: "none",
						});
					});
			},
		},
	};
</script>

<style lang="scss" scoped src="@/common/css/util.scss"></style>
<style lang="scss" scoped>
	.contact {
		.big-title {
			margin-bottom: 50rpx;
		}
		
		.form-box {
			position: relative;
		
			.btnclose {
				width: 44rpx;
				height: 44rpx;
				position: absolute;
				right: 40rpx;
				top: 22rpx;
				z-index: 99;
			}
		}

		.btn-add {
			font-size: 30rpx;
			font-weight: bold;
			color: #0066ff;
			margin: 32rpx auto;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 42rpx;
		}
	}
</style>