<template>
	<view class="">
		<!-- 顶部导航栏 -->
		<view class="headBox" :style="[{ 'height': customBar + 'px'},{ 'line-height' : customBar+20 + 'px'}]">
			<view class="new-top">
				<image class="headBgImg" src="https://apmarket.tt286.com/teeny/icon/buyPageBg2x.png" mode=""></image>
				<view class="">
					<image class="backBtn" src="https://apmarket.tt286.com/teeny/icon/back2x-1.png" mode="" @click="goback">
					<!-- <image class="titleText" src="https://apmarket.tt286.com/teeny/icon/memberText-1.png" mode=""> -->
					<text class="fz32 fw500 titleText">购买vip会员</text>
				</view>
				</image>
			</view>
		</view>
		<!-- 主体区域背景图 -->
		<!-- <image class="bmainBoxImg" src="https://apmarket.tt286.com/teeny/icon/buyPageMain2x.png" mode=""></image> -->
		<!-- 孩子信息 -->
		<view class="mainBox">
			<view class="childBox">
				<view class="disfr ac">
					<image class="childimg" :src="childInfo.avatarUrl">
					</image>
					<view class="">
						<text class="fz32 color0">{{childInfo.nickName}}</text>
						<view class="fz24 color9 mt8">
							{{rTime(childInfo.premium&&childInfo.premium.expireAt||0)}}到期，购买后有效期将顺延
						</view>
					</view>
				</view>
				<view class="priceBox disfr ">
					<view
						:class="['itemPrice','borderbox','fc','jc','ac',index==activeIndex?'activeClass':'noActiveClass']"
						v-for="(item,index) in priceList" :key="item.id" @click="buyBtn(item,index)">
						<text class="priceColor fz24">{{item.name}}</text>
						<view class="buyPrice"><text class="fz26 priceColor">￥</text><text
								class="fz56 priceColor fw500">{{item.amount/100}}</text> </view>
						<text
							:class="['averagePrice','fz24',item.description?'':'opactive0']">{{item.description||0}}</text>
					</view>
				</view>
			</view>
			<view class="payType borderbox ">
				<view class="djb ac">
					<view class="disfr ac">
						<image class="payPng" src="https://apmarket.tt286.com/teeny/icon/vx2x.png" mode="">
						</image>
						<text class="fz32 color3 fw500">微信支付</text>
					</view>
					<radio-group>
						<view class="radioBox" @click="changeCheck">
							<radio value="isSelect" :checked="isSelect" style="transform:scale(0.7)" color="#1bd17b" />
						</view>
						</label>
					</radio-group>
				</view>
				<view class="isreadBox dja">
					<radio-group>
						<view class="radioBox" @click="changeIsread">
							<radio value="isRead" :checked="isRead" style="transform:scale(0.7)" color="#1bd17b" />
						</view>
						</label>
					</radio-group>
					<view class="color9 fz24">
						<text>购买前请阅读</text> <text class="color17B" @click="goDetail">《会员服务协议》</text>
					</view>
				</view>
			</view>
			<view class="dja">
				<view class="payBtn dja fw600" @click="payBtn">同意协议并支付￥{{selectObj.amount/100}}</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customBar: '',
				childInfo: {},
				rTime: this.$fun.rTime,
				priceList: [],
				activeIndex: 0,
				selectObj: {

				},
				isSelect: true,
				isRead: false,
			};
		},
		onLoad(query) {
			this.customBar = getApp().globalData.customBar;
			this.childInfo = JSON.parse(decodeURIComponent(query.childInfo))
			this.$apiCom.premiumGoods({}).then(res => {
				if (res.code == 0) {
					this.priceList = res.data
					this.selectObj = res.data[0]
				}
			})
		},
		methods: {
			payBtn() {
				if (!this.isSelect) {
					uni.showToast({
						title: '请选择微信支付',
						icon: 'none'
					})
					return
				}
				if (!this.isRead) {
					uni.showToast({
						title: '请先阅读会员服务协议',
						icon: 'none'
					})
					return
				}
				this.$apiCom.premiumOrder({
					goodsId: this.selectObj.id,
					childId:this.childInfo.id
				}).then(res => {
					if (res.code == 0) {
						uni.requestPayment({
							"provider": "wxpay", //固定值为"wxpay"
							...res.data,
							success: function(res) {
								// var rawdata = JSON.parse(res.rawdata);
								uni.showToast({
									title: '支付成功',
									icon: 'none'
								})
								
								setTimeout(function() {
									uni.navigateBack({
										delta: 2
									})
								}, 2000);
							},
							fail: function(err) {
								uni.showToast({
									title: '支付失败',
									icon: 'none'
								})
							}
						});
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			buyBtn(item, val) {
				this.activeIndex = val
				this.selectObj = item
			},
			changeCheck(val) {
				this.isSelect = !this.isSelect
			},
			changeIsread() {
				this.isRead = !this.isRead
			},
			goDetail(){
				uni.navigateTo({
					url:"/page_writeOff/publicpage/publicpage?type=5"
				})
			},
			goback() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.mainBox {
		background-image: url('https://apmarket.tt286.com/teeny/icon/buyPageMain2x.png');
		background-size: 100%;
	}

	.bmainBoxImg {
		width: 100%;
		height: 100vh;
	}

	.headBox {
		position: relative;

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
				width: 22rpx;
				height: 36rpx;
				padding: 0 28rpx 18rpx 20rpx;
			}

			.titleText {
				// margin-left: 50rpx;
				// display: block;
				position: absolute;
				left: 50rpx;
				width: 190rpx;
				height: 36rpx;
				line-height: 36rpx;
				bottom: 6rpx;
				padding: 0 28rpx 18rpx 20rpx;
			}
		}

	}

	.childBox {
		padding-left: 40rpx;
		padding-top: 48rpx;

		.childimg {
			width: 96rpx;
			height: 96rpx;
			border-radius: 50%;
			margin-right: 16rpx;
		}

		.priceBox {
			margin-top: 70rpx;
			padding: 0 10rpx 0 0rpx;

			.itemPrice {
				width: 200rpx;
				height: 244rpx;

				border-radius: 16rpx;

				padding: 36rpx 0 34rpx;
				margin-right: 30rpx;

				.buyPrice {
					margin: 8rpx 0 18rpx;
				}

				.priceColor {
					color: #7D2A00;
				}

				.averagePrice {
					color: #895126;
				}
			}

			.activeClass {
				background: #FFE5AE;
				border: 2rpx solid #FFAD00;
			}

			.noActiveClass {
				background: rgba(255, 229, 174, 0.3);
				border: 2rpx solid rgba(255, 173, 0, 0.3);
			}
		}
	}

	.payType {
		padding: 64rpx 40rpx 28rpx;

		.payPng {
			width: 54rpx;
			height: 54rpx;
			border-radius: 50%;
			margin-right: 16rpx;
		}

		.isreadBox {
			margin-top: 58rpx;
		}
	}

	.payBtn {
		width: 670rpx;
		height: 114rpx;
		background: linear-gradient(90deg, #FFD98A 0%, #FFDA8B 100%);
		border-radius: 60rpx;
		color: #8E440D;
		font-size: 36rpx;
	}
</style>
