<template>
	<view>
		<!-- 地图 -->
		<map class="map" id="map" :longitude="mapInfo.longitude" :latitude="mapInfo.latitude" :show-location="true"
			:markers="markers" :circles="circles">
			<view class="map-bottom">
				<view class="map-option">
					<view class="progress-box">
					<view class="pgBtn pg-minus" @click="minusPg">
						<text class="wxfont icon-minus"></text>
					</view>
					<view class="wxSlider">
						<slider activeColor="#0066ff" block-color="#0066ff" block-size="20" :value="mapInfo.radius"
							@change="sliderChange" step="20" min="100" max="1000" />

						<text class="txtDis">{{ mapInfo.radius }}米</text>
						<text class="txtDis">1000米</text>
					</view>
					<view class="pgBtn pg-plus" @click="addPg">
						<text class="wxfont icon-plus"></text>
					</view>

				</view>
				<button type="button" class="confirmBtn" @click="confirmSel">确定</button>
				</view>

				<view class="addrBox">
					<view class="inputBg" @click="chooseAddr">
						<text class="iconSearch wxfont icon-search"></text>
						<text class="txtHolder">请输入地址名称</text>
					</view>

					<view class="addressName">{{ mapInfo.addressName }}</view>
					<view class="addrDis">{{ mapInfo.address }}</view>
				</view>
			</view>
		</map>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				mapInfo: {
					latitude: 31.177543,
					longitude: 121.416665,
					addressName: "",
					address: "",
					radius: 200
				},
				markers: [],
				circles: [],
			};
		},
		created() {
			const detailInfo = uni.getStorageSync("fenceInfo"); //获取详情信息
			if (detailInfo) {
				this.mapInfo = {
					...this.mapInfo,
					...detailInfo
				}
				uni.removeStorageSync("fenceInfo");
			}
			
			this.initMap(this.mapInfo);
		},
		methods: {
			confirmSel() {
				if(this.mapInfo.addressName == ""){
					uni.showToast({
						title: "请选择地址",
						icon: "none",
						duration: 3000,
					});
					return;
				}
				uni.setStorageSync("isNavigating", true);
				// 页面之间传值
				uni.setStorageSync("mapInfo", this.mapInfo);
				// 返回上一页
				uni.navigateBack()
			},
			initMap(res) {
				this.mapInfo.latitude = res.latitude;
				this.mapInfo.longitude = res.longitude;
				this.mapInfo.address = res.address || "";
				this.mapInfo.addressName = res.name || "";
				this.markers = [{
					id: 1,
					latitude: res.latitude,
					longitude: res.longitude,
				}]
				this.circles = [{
					latitude: res.latitude,
					longitude: res.longitude,
					radius: this.mapInfo.radius,
					color: "00000000",
					fillColor: "#42b98355"
				}]
			},
			minusPg() {
				this.mapInfo.radius = this.mapInfo.radius - 20;
			},
			addPg() {
				this.mapInfo.radius = this.mapInfo.radius + 20;
			},
			chooseAddr() {
				wx.chooseLocation({
					success: (res) => {
						console.log(res);
						this.initMap(res);
					},
					complete: (res) => {
						console.log(res);
					}
				})

			},

			sliderChange(e) {
				console.log('value 发生变化：' + e.detail.value)
				this.mapInfo.radius = e.detail.value

				// 计算围栏
				this.calculateFence();

			},
			calculateFence() {
				this.circles[0].radius = this.mapInfo.radius;

			},
		},
	};
</script>

<style lang="scss" scoped src="@/common/css/util.scss"></style>
<style scoped src="@/static/iconfont/iconfont.css"></style>
<style lang="scss" scoped>
	.map {
		width: 100%;
		height: 100vh;

		&-bottom {
			position: fixed;
			bottom: 120rpx;
			left: 32rpx;
			width: 100%;
		}

		.map-option{
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			
			.confirmBtn{
				width: 100rpx;
				border-radius: 32rpx;
				background-color: #0066ff;
				color: #FFFFFF;
				margin-left: 20rpx;
			}
		}

		.progress-box {
			width: 500rpx;
			height: 112rpx;
			background: #FFFFFF;
			border-radius: 32rpx 32rpx 32rpx 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;


			.wxSlider {
				width: 300rpx;
				margin: 0 16rpx 0;
			}

			.pgBtn {
				width: 40rpx;
				height: 40rpx;
				background: #E1E1E1;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				color: #878787;
				font-weight: bold;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.addrBox {
			width: 670rpx;
			background: #FFFFFF;
			border-radius: 32rpx 32rpx 32rpx 32rpx;
			box-sizing: border-box;
			padding: 32rpx 40rpx;

			.addressName {
				font-size: 28rpx;
				color: #000000;
				line-height: 40rpx;
				margin-top: 24rpx;
			}

			.addrDis {
				font-size: 24rpx;
				color: rgba(0, 0, 0, 0.4);
				line-height: 34rpx;
			}
		}

		.inputBg {
			width: 590rpx;
			height: 86rpx;
			background: rgba(178, 178, 178, 0.22);
			border-radius: 44rpx 44rpx 44rpx 44rpx;
			display: flex;
			align-items: center;
			font-size: 32rpx;
			color: rgba(0, 0, 0, 0.4);

			.iconSearch {
				margin-left: 24rpx;
				font-weight: bold;
				font-size: 32rpx;
				margin-right: 12rpx;
			}



		}
	}
</style>

<style></style>