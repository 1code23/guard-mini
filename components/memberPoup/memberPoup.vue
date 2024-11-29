<template>
	<view>
		<!-- <view class="memberBox fz32 fw500 borderbox" v-if="type=='express'">
			<image class="btnclose" src="https://apmarket.tt286.com/teeny/icon/btnclose2x.png" mode="" @click="closeMember"></image>
		    <view class="color3 textDesc">{{text}}</view>
		    <view class="renewBox dja" @click="renewBtn">立即续费</view>
		</view> -->
		<view :class="['memberBox','fz32','fw500','borderbox',type=='remind'?'remindMemberBox':'expressMemberBox']">
			<image class="btnclose" src="https://apmarket.tt286.com/teeny/icon/btnclose2x.png" mode="" @click="closeMember"></image>
		    <view class="color3 textDesc">{{text}}</view>
		    <view class="renewBox dja" @click="renewBtn">立即续费</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"memberPoup",
		props:{
			text: {
				type: String,
				default: '该设备会员已到期，续费后才可继续使用管控功能'
			},
			type: {
				type: String,
				default: 'express'
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			renewBtn(){
				this.$emit('renewBtn')
			},
			closeMember(){
				this.$emit('closeMember')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.remindMemberBox{
		height: 576rpx;
		background-image: url('https://apmarket.tt286.com/teeny/icon/remindBg2x.png');
	}
	.expressMemberBox{
		height: 496rpx;
		background-image: url('https://apmarket.tt286.com/teeny/icon/expressMember2x.png');
	}
    .memberBox{
		width: 590rpx;
		background-size: 100%;
	    padding: 0 42rpx 0rpx 40rpx;
		.btnclose{
			width: 44rpx;
			height: 44rpx;
			margin: 142rpx 0rpx 0 476rpx;
		}
		.textDesc{
			margin: 50rpx 0 36rpx 0;
			text-align: center;
		}
		.renewBox{
			width: 510rpx;
			height: 88rpx;
			background: linear-gradient(90deg, #FFF2A9 0%, #FFC971 100%);
			border-radius: 56rpx;
			color: #9C521C;
			font-weight: 600;
		}
	}
</style>