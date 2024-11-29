<template>
	<view class="">
		<!-- 主体区域背景图 -->
		<view class="bmainBoxImg"></view>
		<!-- 孩子信息 -->
		<view
			:class="['childBox','borderbox',(childInfo.premium&&childInfo.premium.state=='active')?'isVipClass':'isNoVipClass']">
			<view class="childinfoBox">
				<view class="djb">
					<view class="djb">
						<image class="childimg" :src="childInfo.avatarUrl" mode="">
						</image>
						<view class="childInfo">
							<view
								:class="['fz36','disfr','ac',(childInfo.premium&&childInfo.premium.state=='active')?'isVipClassName':'color3']">
								{{childInfo.nickName}}
								<image v-if="childInfo.premium&&childInfo.premium.state=='active'" class="vipPng"
									src="https://apmarket.tt286.com/teeny/icon/isvip2x.png" mode=""></image>
								<image v-else class="vipPng" src="https://apmarket.tt286.com/teeny/icon/noVip2x.png"
									mode=""></image>
							</view>
							<view class="fz24 mt8"><text class="endtime"
									v-if="(childInfo.premium&&childInfo.premium.state=='active')">
									{{rTime(childInfo.premium.expireAt)}}到期</text><text v-else
									class="novipClass">会员已到期，建议立即续费</text> </view>
						</view>
					</view>
					<text
						:class="['fz24',(childInfo.premium&&childInfo.premium.state=='active')?'recordBtn':'novipClass']"
						@click='goBuyrecord'>购买记录</text>
				</view>
				<view
					:class="[(childInfo.premium&&childInfo.premium.state=='active')?'isrenewBox':'norenewBox','renewBox','dja','fz32','fw600']"
					@click="goBuy">立即续费
				</view>
			</view>
		</view>
		<!-- 会员特权 -->
		<view class="mainBox bgcF">
			<view class="memberFlag disfr ac">
				<image class="memberPng" src="https://apmarket.tt286.com/teeny/icon/vip2x.png" mode="">
				</image>
				<image class="memberTextPng" src="https://apmarket.tt286.com/teeny/icon/hytq2x.png" mode="">
				</image>
			</view>
			<view class="memberKind borderbox disfr ac" v-for="(item,index) in memberArray" :key="index">
				<image class="memberKindPng" :src="item.src" mode=""></image>
				<view class="">
					<text class="fz28 color3">{{item.text}}</text>
					<view class="fz24 color9 mt8">{{item.desc}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customBar: '',
				isAnonymous: true,
				rTime: this.$fun.rTime,
				childInfo: {},
				memberArray: [{
					src: 'https://apmarket.tt286.com/teeny/icon/sytj2x.png',
					text: '使用统计',
					desc: '轻松查看孩子手机的使用情况'
				}, {
					src: 'https://apmarket.tt286.com/teeny/icon/sjgl2x.png',
					text: '时间管理',
					desc: '合理安排使用时间，养成良好的用机习惯'
				}, {
					src: 'https://apmarket.tt286.com/teeny/icon/qxgl2x.png',
					text: '权限管理',
					desc: '特殊权限轻松管理，孩子使用更放心'
				}, {
					src: 'https://apmarket.tt286.com/teeny/icon/wzgl2x.png',
					text: '网址管理',
					desc: '不良网址全部屏蔽，保护孩子的身心健康'
				}, {
					src: 'https://apmarket.tt286.com/teeny/icon/jksh2x.png',
					text: '健康守护',
					desc: '用机贴心提醒，为孩子的视力和听力健康护航'
				}, {
					src: 'https://apmarket.tt286.com/teeny/icon/moremember2x.png',
					text: '更多会员特权',
					desc: '正在玩命开发中，敬请期待'
				}]
			};
		},
		onLoad(query) {
			this.customBar = getApp().globalData.customBar;
			this.childInfo = JSON.parse(decodeURIComponent(query.childInfo))
			if (uni.getStorageSync('testClickNum')||uni.getStorageSync('isLoginTest')) { //试用模式下第一次点击
				this.isAnonymous = true
			} else {
				this.isAnonymous = false
			}
		},
		methods: {
			goBuyrecord() {
				if(uni.getStorageSync('isLoginTest')){
					uni.showToast({
						title: '试用模式下不可查看',
						icon: 'none'
					})
					return
				}
				let childInfo = encodeURIComponent(JSON.stringify(this.childInfo))
				uni.navigateTo({
					url: '/page_writeOff/buyrecord/buyrecord?childInfo=' + childInfo
				})
			},
			goBuy() {
				if(uni.getStorageSync('isLoginTest')){
					uni.showToast({
						title: '试用模式下不可充值',
						icon: 'none'
					})
					return
				}
				let childInfo = encodeURIComponent(JSON.stringify(this.childInfo))
				uni.navigateTo({
					url: "/page_writeOff/buy/buy?childInfo=" + childInfo
				})
			}

		}
	}
</script>

<style lang="scss">
	.bmainBoxImg {
		width: 100%;
		height: 300rpx;
		background-color: black;
	}

	.headBox {
		position: relative;
		background-color: black;

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
				width: 19rpx;
				height: 42rpx;
				padding: 0 28rpx 18rpx 20rpx;
			}

			.titleText {
				margin-left: 50rpx;
			}
		}

	}

	.childBox {
		width: 670rpx;
		height: 330rpx;
		border-radius: 32rpx;
		margin-left: 40rpx;

		position: absolute;
		top: 48rpx;
		z-index: 2;

		.childinfoBox {
			margin: 46rpx 32rpx 34rpx 36rpx;
		}

		.childimg {
			width: 96rpx;
			height: 96rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}

		.childInfo {
			.vipPng {
				width: 60rpx;
				height: 32rpx;
				margin-left: 4rpx;
			}

			.endtime {
				color: rgba(188, 111, 15, 0.75);
			}
		}

		.recordBtn {
			color: rgba(188, 111, 15, 0.75);
		}

		.renewBox {
			width: 592rpx;
			height: 88rpx;
			border-radius: 44rpx;
			margin-top: 64rpx;
		}

		.norenewBox {
			background: linear-gradient(90deg, #FFD98A 0%, #FFDA8B 100%);
			color: #8E440D;
		}

		.isrenewBox {
			background: linear-gradient(139deg, #5C3700 0%, #442000 100%);
			color: #FFEAC1;
		}
		.isrenewBox1{
			opacity: 0.3;
		}
	}

	.mainBox {
		border-radius: 32rpx 32rpx 0rpx 0rpx;
		padding: 102rpx 40rpx 90rpx;
		position: absolute;
		margin-top: -25rpx;

		.memberFlag {
			margin: 24rpx 0 34rpx;

			.memberPng {
				width: 68rpx;
				height: 28rpx;
				margin-right: 10rpx;
			}

			.memberTextPng {
				width: 156.56rpx;
				height: 32rpx;
			}
		}

		.memberKind {
			width: 670rpx;
			height: 152rpx;
			background: rgba(229, 229, 229, 0.2);
			border-radius: 32rpx;
			padding: 32rpx 30rpx 28rpx;
			margin-bottom: 24rpx;

			.memberKindPng {
				width: 92rpx;
				height: 92rpx;
				margin-right: 22rpx;
			}
		}
	}

	.isVipClass {
		background-size: 100%;
		background-image: url('https://apmarket.tt286.com/teeny/icon/isVipBg2x.png');
	}

	.isNoVipClass {
		background-size: 100%;
		background-image: url('https://apmarket.tt286.com/teeny/icon/noVipBg2x.png');
	}

	.isVipClassName {
		color: #76420D;
	}

	.novipClass {
		color: rgba(102, 102, 102, 0.75);
	}
</style>
