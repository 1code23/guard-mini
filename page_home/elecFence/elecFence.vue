<template>
	<view class="wx_flex_container elecFence">
		<view class="white-box" v-if="list.length">
			<view class="flatBox" v-for="(item, index) in list" :key="index">
				<view class="flatItem">
					<view class="flatTitleBox" @click="editFence(item)"><text class="flatTitle">{{ item.name }}</text>
						<view class="wxfont icon-edit"></view>
					</view>
					<text class="flatDesc">{{ item.address }}</text>
				</view>
				<switch :checked="item.switch == 1" color="#0066FF" @change="(e)=>switchChange(e, item.id)"
					style="transform: scale(0.9)" />
			</view>
		</view>
		<view v-else class="empty-box">
			<image class="empty-img" src="https://hsapmarket.zy845.com/guard/wx/fence_empty.png" />
			<text class="empty-text">添加电子围栏，及时获取老人动向</text>
		</view>

		<view class="footer-box">
			<view class="btn-blue" @click="editFence()">添加电子围栏</view>
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
				list: [],
			}
		},
		onShow() {
			this.getList();
		},
		created() {
			uni.removeStorageSync("isNavigating");
			uni.removeStorageSync("mapInfo");
			uni.removeStorageSync("fenceInfo");
		},
		computed: {
			...mapGetters(["binduser"]), //获取vuex中存的数据
		},
		methods: {
			editFence(item) {
				if (item) {
					uni.setStorageSync("fenceInfo", item);
					uni.navigateTo({
						url: `/page_home/editFence/editFence`,
					})
					return
				}
				uni.navigateTo({
					url: "/page_home/editFence/editFence",
				})
			},
			getList() {
				let obj = {
					elderId: this.binduser.id || 0,
					page: 1,
					pageNum: 1000,
				};
				this.$apiCom.fenceUnion("GET", obj).then((res) => {
					if (res.code == 0) {
						this.list = res.data.list;
					}
				});
			},
			switchChange(e, id) {
				if (uni.getStorageSync("isLoginTest")) {
					return;
				}
				let obj = {
					elderId: this.binduser.id || 0,
					id,
					switch: e.detail.value ? 1 : 2,
				};
				this.$apiCom.fenceUnion("PUT", obj, "/updateSwitch")
			},

		}
	}
</script>
<style scoped src="@/static/iconfont/iconfont.css"></style>
<style lang="scss" scoped src="@/common/css/util.scss"></style>
<style lang="scss" scoped>
	.elecFence {
		.flatBox {
			margin-bottom: 22rpx;
		}

		.flatTitleBox {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
		}

		.icon-edit {
			font-size: 32rpx;
			color: #999999;
			margin-left: 10rpx;
		}
	}

	.empty-box {
		width: 100%;
		height: 85vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.empty-img {
			width: 100px;
			height: 100px;
			margin-bottom: 12rpx;
		}

		.empty-text {
			font-size: 28rpx;
			color: rgba(0, 0, 0, 0.4);
			line-height: 40rpx;
		}
	}
</style>