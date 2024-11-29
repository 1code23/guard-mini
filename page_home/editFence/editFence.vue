<template>
	<div class="harass wx_flex_container">
		<view class="white-box">
			<view class="form-item">
				<view class="form-label">地点名称</view>
				<input type="text" placeholder="请输入(最多八个字符)" class="form-input" v-model="detailInfo.name" />
			</view>

			<view class="flatBox" @click="navTo()">
				<view class="flatItem">
					<text class="flatTitle">添加地址</text>
					<text class="flatDesc">{{ detailInfo.address || "点击添加地址" }}</text>
				</view>
				<image class="arrowImg" src="https://apmarket.tt286.com/teeny/icon/arrow2x.png"></image>
			</view>
		</view>
		<view class="mt20">提醒设置</view>
		<view class="white-box">
			<view class="flatBox">
				<view class="flatItem">
					<text class="flatTitle">离开地点时提醒我</text>
				</view>
				<switch :checked="detailInfo.leaveNotice" @change="switchLeave" color="#0066FF" style="transform: scale(0.9)" />
			</view>
			<view class="flatBox">
				<view class="flatItem">
					<text class="flatTitle">到达地点时提醒我</text>
				</view>
				<switch :checked="detailInfo.arriveNotice" @change="switchArrive"  color="#0066FF" style="transform: scale(0.9)" />
			</view>
		</view>

		<!-- <view class="footer-box" v-if="detailInfo.id">
			<view class="btn-blue btn-red" @click="deleteFence()">删除</view>
			<view class="btn-blue" @click="submit()">保存</view>
		</view> -->

		<view class="footer-box">
			<view class="btn-blue" @click="submit()">保存</view>
		</view>
	</div>
</template>
<script>
	import {
		mapGetters
	} from "vuex";
	export default {
		data() {
			return {
				detailInfo: {
					name: "",
					address: "",
					leaveNotice: false,
					arriveNotice: false,
				},
			};
		},
		computed: {
			...mapGetters(["binduser"]), //获取vuex中存的数据
		},
		onShow() {
			const detailInfo = uni.getStorageSync("fenceInfo"); //获取详情信息
			if (detailInfo) {
				this.detailInfo = detailInfo;
				this.detailInfo.leaveNotice == 1 ? true : false;
				this.detailInfo.arriveNotice == 1 ? true : false;
				uni.removeStorageSync("fenceInfo");
			}

			const isNavigating = uni.getStorageSync("isNavigating");
			if (isNavigating) {
				// 清理标志
				uni.removeStorageSync("isNavigating");

				const mapInfo = uni.getStorageSync("mapInfo"); //获取地图信息
				if (mapInfo) {
					this.detailInfo = {
						...this.detailInfo,
						...mapInfo
					};
					uni.removeStorageSync("mapInfo");
				}
			} else {
				// 用户是直接进入的状态
				console.log("用户是直接进来的");
			}
		},

		methods: {
			deleteFence(){
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
					content: "确认要删除该地点吗?",
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
			submit() {
				if (uni.getStorageSync("isLoginTest")) {
					uni.showToast({
						title: "请绑定老人设备后再进行操作",
						icon: "none",
					});
					return;
				}
				if (this.detailInfo.name.length < 2) {
					uni.showToast({
						title: "请填写正确的地点名称",
						icon: "none",
						duration: 3000,
					});
					return;
				} else if (this.detailInfo.name.length > 8) {
					uni.showToast({
						title: "地点名称不可超过8个字符，请重新输入",
						icon: "none",
						duration: 3000,
					});
					return;
				}
				if(this.detailInfo.address == ""){
					uni.showToast({
						title: "请选择地址",
						icon: "none",
						duration: 3000,
					});
					return;
				}

				let obj = JSON.parse(JSON.stringify(this.detailInfo));
				obj.elderId = this.binduser.id || 0;
				obj.arriveNotice = obj.arriveNotice ? 1 : 2;
				obj.leaveNotice = obj.leaveNotice ? 1 : 2;
				console.log(obj);

				this.$apiCom.fenceUnion(obj.id ? "PUT" : "POST", obj)
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
			navTo() {
				uni.setStorageSync('fenceInfo', this.detailInfo)
				uni.navigateTo({
					url: "/page_home/addrSuggest/addrSuggest",
				});
			},
			switchLeave(e) {
				this.detailInfo.leaveNotice = e.detail.value;
			},
			switchArrive(e) {
				this.detailInfo.arriveNotice = e.detail.value;
			},
		},
	};
</script>
<style lang="scss" scoped src="@/common/css/util.scss"></style>
<style lang="scss" scoped>
	.harass {}
</style>