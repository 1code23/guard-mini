<template>
	<view class="dialogBox">
		<view class="logountTitle fw550 color0 disfr jc">{{title}}</view>
		<view class="popup-content fc ac">
			<view class="disfr ac color0 fw550 fz30" style="margin-bottom: 32rpx;">{{content}}</view>
			<view class="disfr ac radioBox" v-if="undindType==2">
				<radio-group>
					<view class="" @click="changeCheck">
						<radio value="isRead" :checked="isRead" style="transform:scale(0.6)" color="#0066FF" />
					</view>	
				</radio-group>
				<view class="clearDataStr">解绑后清除所有设备数据</view>
			</view>
			<view class="disfr jc ac">
				<view class="closeBtn fz32 color0 disfr ac jc" @click="closeBtn">{{closeStr}}</view>
				<view :class="['closeBtn','logountBtn','fz32','disfr','ac','jc','colorF0',{colorB:isBlue}]" @click="submitBtn">{{submitStr}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			undindType: {
				type: Number,
				default: 1
			},
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			closeStr: {
				type: String,
				default: '取消'
			},
			submitStr: {
				type: String,
				default: '确认'
			},
			isBlue: {
				type: Boolean,//是否为蓝色
				default: false
			},
		},
		data(){
			return{
				isRead: false,
			}
		},
		methods:{
			changeCheck(val) {
				this.isRead = !this.isRead
			},
			closeBtn() {
			   this.$emit('closeBtn')
			},
			submitBtn() {
			   this.$emit('submitBtn',this.isRead)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dialogBox{
		background-color: #fff;
		border-radius: 44rpx;
		width: 650rpx;
		padding-top: 54rpx;
	}
	.popup-content {
		padding: 32rpx 48rpx;
		border-radius: 26rpx;
		background-color: #fff;
		// width: 670rpx;
		box-sizing: border-box;
	}
	.closeBtn{
		width: 270rpx;
		height: 88rpx;
		background: rgba(178,178,178,0.22);
		border-radius: 48rpx;
		margin-top: 24rpx;
	}
	.logountBtn{
		margin-left: 20rpx;
		
	}
	.colorB{
		color: #0066FF;
	}
	.logountTitle{
		font-size: 34rpx;
		// margin-top: 54rpx;
	}
	.clearDataStr{
		font-size: 24rpx;
		color: rgba(0,0,0,0.8);
	}
	.radioBox{
		justify-content: flex-start;
		width: 100%;
	}
</style>