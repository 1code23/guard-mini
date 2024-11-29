<template>
	<view class="wx_flex_container wx-track">
		<!-- 地图 -->
		<map class="map" id="map" :longitude="mapInfo.longitude" :latitude="mapInfo.latitude" :show-location="true"
			:markers="markers" :polyline="polyline">
			<view class="map-bottom">
				<view class="white-box">
					<view class="map-title">
						<view class="line-title">
							<view class="dot"></view>开始时间
						</view>
						<view class="uni-input">
							<view class="uni-title" @click="showPopup('start')">{{ getFormatDate(startTime) }}</view>
							<view class="wxfont icon-gengduo"></view>
						</view>
					</view>
					<view class="map-title">
						<view class="line-title">
							<view class="dot dot-red"></view>结束时间
						</view>
						<view class="uni-input">
							<view class="uni-title" @click="showPopup('end')">{{ getFormatDate(endTime) }}</view>
							<view class="wxfont icon-gengduo"></view>
						</view>
					</view>
					<view class="btn-blue" @click="showTrack">查看</view>
				</view>
			</view>
		</map>

		<uni-popup ref="messagePopup" @change="change" background-color="#fff">
			<view class="message-box">
				<view class="uni-title">该时段未收录到位置信息？</view>
				<view class="uni-text">请确认老人端网络状态和位置信息是否开启或换个时段试试</view>
				<view class="btn-blue">我知道了</view>
			</view>
		</uni-popup>

		<uni-popup ref="popup" @change="change">
			<view class="uni-date-popup">
				<view class="uni-date-title">{{ timeWhich == "start"? "开始时间" : "结束时间" }}</view>
				<view class="uni-date"> {{ formatDate(value) }}</view>

				<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
					<picker-view-column>
						<view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item, index) in hours" :key="index">{{ item }}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item, index) in minutes" :key="index">{{ item }}分</view>
					</picker-view-column>
				</picker-view>

				<view class="uni-row">
					<view class="uni-col">
						<view class="uni-button btn-cancel" @click="closePopup">取消</view>
					</view>
					<view class="uni-col">
						<view class="uni-button" @click="checkTime">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";

	export default {
		data() {
			const years = [];
			const months = [];
			const days = [];
			const hours = [];
			const minutes = [];

			const currentDate = new Date();
			const minDate = new Date(currentDate);
			minDate.setMonth(currentDate.getMonth() - 12);

			// 获取年份
			const currentYear = currentDate.getFullYear();
			const minYear = minDate.getFullYear();

			// 填充年份和月份数组
			if (currentYear === minYear) {
				for (let month = 0; month <= currentDate.getMonth(); month++) {
					months.push(`${currentYear}/${month + 1}`);
				}
			} else {
				for (let year = minYear; year <= currentYear; year++) {
					if (year === minYear) {
						const startMonth = minDate.getMonth(); // 从最小日期的月份开始
						for (let month = startMonth; month < 12; month++) {
							months.push(`${year}/${month + 1}`);
						}
					} else if (year === currentYear) {
						for (let month = 0; month <= currentDate.getMonth(); month++) {
							months.push(`${year}/${month + 1}`);
						}
					} else {
						for (let month = 0; month < 12; month++) {
							months.push(`${year}/${month + 1}`);
						}
					}
				}
			}

			// 填充日数组 日期为currentDate 当前月份的所有日期
			const currentMonth = currentDate.getMonth();
			const currentMonthDays = new Date(
				currentDate.getFullYear(),
				currentMonth + 1,
				0
			).getDate();
			for (let day = 1; day <= currentMonthDays; day++) {
				days.push(day);
			}

			// 填充时数组
			for (let hour = 0; hour < 24; hour++) {
				hours.push(hour);
			}

			// 填充分数组
			for (let minute = 0; minute < 60; minute++) {
				minutes.push(minute);
			}

			return {
				years,
				months,
				days,
				hours,
				minutes,
				timeWhich: "",
				startTime: [],
				endTime: [],
				value: [0, 0, 0, 0],
				indicatorStyle: `height: 50px;`,

				// 线
				markers: [],
				polyline: [],
				mapInfo: {
					latitude: 31.177543,
					longitude: 121.416665,
				},
			};
		},
		computed: {
			...mapGetters(["binduser"]), //获取vuex中存的数据
			START_TIME() {
				if (this.startTime.length) {
					return this.startTime;
				}
				return this.startTime;
			},
			getEndTime() {
				return this.endTime;
			},
		},
		created() {
			// 默认startTime为当前日期的前3小时 和 endTime为当前时间
			const currentDate = new Date();
			const startTime = new Date(currentDate);
			const endTime = new Date(currentDate);
			startTime.setHours(currentDate.getHours() - 3);
			endTime.setHours(currentDate.getHours());
			this.startTime = [
				startTime.getFullYear(),
				startTime.getMonth() + 1,
				startTime.getDate(),
				startTime.getHours(),
				startTime.getMinutes(),
			];
			this.endTime = [
				endTime.getFullYear(),
				endTime.getMonth() + 1,
				endTime.getDate(),
				endTime.getHours(),
				endTime.getMinutes(),
			];
			console.log("startTime", this.startTime);
			console.log("endTime", this.endTime);

			this.showTrack();
		},
		methods: {
			bindChange(e) {
				console.log(e);

				this.value = e.detail.value;

				this.changeDaysList();
			},
			changeDaysList() {
				const currentDate = new Date();
				// 计算当前月份的天数
				const currentMonth = this.months[this.value[0]];
				const currentYear = currentMonth.split("/")[0];
				const currentMonthNum = currentMonth.split("/")[1];
				// 填充日数组
				this.days = [];
				// 如果是当前月份 ，则获取今日以前的所有天数
				if (currentMonthNum == currentDate.getMonth() + 1) {
					const currentDay = currentDate.getDate();
					for (let day = 1; day <= currentDay; day++) {
						this.days.push(day);
					}
				} else {
					const currentMonthDays = new Date(
						currentYear,
						currentMonthNum,
						0
					).getDate();

					for (let day = 1; day <= currentMonthDays; day++) {
						this.days.push(day);
					}
				}
			},
			getDateTimeStamp(dateArr) {
				const dateTime = new Date(
					dateArr[0] +
					"/" +
					dateArr[1] +
					"/" +
					dateArr[2] +
					" " +
					dateArr[3] +
					":" +
					dateArr[4] +
					":00"
				);
				return dateTime.getTime() / 1000;
			},
			showTrack() {
				let obj = {
					elderId: this.binduser.id || 0,
				};
				// 获取startTime 与 endTime的时间戳
				obj.startTime = this.getDateTimeStamp(this.startTime);
				obj.endTime = this.getDateTimeStamp(this.endTime);

				this.$apiCom
					.fenceUnion("GET", obj, "/track")
					.then((res) => {
						if (res.code != 0) {
							uni.showToast({
								title: res.msg,
								icon: "none",
							});
						} else {
							if (res.data.list && res.data.list.length) {
								const list = res.data.list;
								const start = list[0];
								// list的最后一条
								const end = list[list.length - 1];

								this.mapInfo.latitude = start.latitude;
								this.mapInfo.longitude = start.longitude;

								this.markers.push({
									id: 1,
									width: 56,
									height: 64,
									latitude: start.latitude,
									longitude: start.longitude,
									iconPath: "https://hsapmarket.zy845.com/guard/wx/startpoint.png",
								});

								this.markers.push({
									id: 2,
									width: 56,
									height: 64,
									latitude: end.latitude,
									longitude: end.longitude,
									iconPath: "https://hsapmarket.zy845.com/guard/wx/endpoint.png",
								});

								this.polyline = [{
									points: list,
									color: "#0066FF",
									width: 10,
									dottedLine: false,
								}, ];
							} else {
								this.showErrorMsg();
							}
						}
					})
					.catch((err) => {
						uni.showToast({
							title: "暂无网络连接",
							icon: "none",
						});
					});
			},
			// 显示错误信息
			showErrorMsg() {
				uni.showModal({
					showCancel: false,
					confirmText: "我知道了",
					confirmColor: "#0066ff",
					title: "该时段未收录到位置信息？",
					content: "请确认老人端网络状态和位置信息是否开启或换个时段试试",
					success: (wxres) => {
						if (wxres.confirm) {
							console.log("用户点击确定");
						} else if (wxres.cancel) {
							console.log("用户点击取消");
						}
					},
				});
			},
			change(e) {
				console.log("当前模式：" + e.type + ",状态：" + e.show);
			},
			closePopup() {
				this.$refs.popup.close();
			},
			showPopup(type) {
				let date = this.startTime;
				if (type == "end") {
					date = this.endTime;
				}
				this.timeWhich = type;
				//   找到对应值的索引

				const yearAndMonth = this.months.findIndex(
					(item) => item == `${date[0]}/${date[1]}`
				);
				this.changeDaysList();

				const day = this.days.findIndex((item) => item === date[2]);
				const hour = this.hours.findIndex((item) => item === date[3]);
				const minute = this.minutes.findIndex((item) => item === date[4]);

				this.value = [yearAndMonth, day, hour, minute];

				this.$refs.popup.open();
			},
			checkTime() {
				const dateArr = this.getDateArray(this.value);

				let showVal = "";
				if (dateArr.length) {
					showVal = [dateArr[0], dateArr[1], dateArr[2], dateArr[3], dateArr[4]];
				}

				if (this.timeWhich == "start") {
					this.startTime = showVal;
				} else if (this.timeWhich == "end") {
					this.endTime = showVal;
				}

				this.closePopup();
			},
			getFormatDate(val) {
				// 这里拿到的是要显示的值 只需要格式转化一下就行
				if (val.length == 0) return "";
				return `${val[0]}年${val[1]}月${val[2]}日 ${val[3]}时${val[4]}分`;
			},
			getDateArray(val) {
				// picker-view 返回的是索引值，需要转换成日期
				if (val.length == 0) return val;

				let year = "",
					month = "";
				const yearAndMonth = this.months[val[0]];
				const day = this.days[val[1]];
				const hour = this.hours[val[2]];
				const minute = this.minutes[val[3]];

				if (yearAndMonth != 0) {
					year = yearAndMonth.split("/")[0];
					month = yearAndMonth.split("/")[1];
				}
				return [year, month, day, hour, minute];
			},
			formatDate(val) {
				// picker-view 返回的是索引值，需要转换成日期
				if (val.length == 0) return "";

				const dateArr = this.getDateArray(val);
				return `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日 ${dateArr[3]}时${dateArr[4]}分`;
			},
		},
	};
</script>
<style scoped src="@/static/iconfont/iconfont.css"></style>
<style lang="scss" scoped src="@/common/css/util.scss"></style>
<style lang="scss" scoped>
	.wx-track {
		padding: 0;
	}

	.map {
		width: 100%;
		height: 100vh;

		.white-box {
			padding-top: 48rpx;
			padding-bottom: 38rpx;
		}

		&-bottom {
			position: fixed;
			bottom: 120rpx;
			left: 40rpx;
			width: 670rpx;
		}

		&-title {
			margin-bottom: 38rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.line-title {
				display: flex;
				align-items: center;
				font-size: 30rpx;
				color: rgba(0, 0, 0, 0.6);
				line-height: 40rpx;

				.dot {
					width: 16rpx;
					height: 16rpx;
					background: #32bb7a;
					border-radius: 50%;
					margin-right: 16rpx;
				}

				.dot-red {
					background-color: #ff7413;
				}

			}

			.uni-input {
				display: flex;
				align-items: center;

				.uni-title {
					font-size: 32rpx;
					color: rgba(0, 0, 0, 1);
					line-height: 48rpx;
				}

				.wxfont {
					color: #979797;
					font-weight: bold;
					font-size: 24rpx;
					margin-left: 16rpx;
				}
			}
		}

		&-title:nth-child(2) {
			margin-bottom: 48rpx;
		}



	}

	.uni-date-popup {
		width: 720rpx;
		border-radius: 32rpx;
		background: #ffffff;
		box-sizing: border-box;
		overflow: hidden;
		padding: 32rpx 0;

		.uni-date-title {
			font-weight: bold;
			font-size: 34rpx;
			color: #000000;
			line-height: 40rpx;
			text-align: center;
			margin-bottom: 16rpx;
		}

		.uni-date {
			font-size: 30rpx;
			color: rgba(0, 0, 0, 0.8);
			line-height: 44rpx;
			text-align: center;
		}

		.uni-row {
			display: flex;
			justify-content: center;
			align-items: center;

			.uni-button {
				width: 277rpx;
				height: 88rpx;
				background: #0066ff;
				font-weight: bold;
				font-size: 32rpx;
				color: #ffffff;
				line-height: 88rpx;
				text-align: center;
				border-radius: 44rpx;
			}

			.btn-cancel {
				background: rgba(178, 178, 178, 0.22);
				margin-right: 20rpx;
				color: #000000;
			}
		}
	}

	.message-box {
		.uni-title {
			font-weight: bold;
			font-size: 34rpx;
			color: #000000;
			line-height: 40rpx;
			text-align: center;
		}

		.uni-text {
			font-size: 30rpx;
			color: #000000;
			line-height: 44rpx;
			text-align: left;
		}
	}
</style>
<style>
	.picker-view {
		width: 750rpx;
		height: 600rpx;
		margin-top: 20rpx;
	}

	.item {
		line-height: 100rpx;
		text-align: center;
	}
</style>