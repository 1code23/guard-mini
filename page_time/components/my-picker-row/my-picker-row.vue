<template>
	<view class="">
		<view class="disfr jsb ac">
			<view class="">
				<view class="">
					<text class="fz32 fw400 color3">{{objData.leftString}}</text>
				</view>
				<text class="fz28 color9">{{objData.leftDesc}}</text>
			</view>
			<view class="disfr ac">
				<picker mode="multiSelector" @change="bindPickerChange" :value="index" :range="array">
					<view class="fz28 color9 uni-input disfr ac">
					<text v-if="showtype==1">{{index[0]}}时{{index[1] | minStr}}分</text>
					<view v-if="showtype==2"><text v-show="ismorrow">次日</text> {{index[0] | minStr}}:{{index[1] | minStr}}</view>
					<img src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" alt="" class='arrowBtn'>
					</view>
				</picker>

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			objData: {
				type: Object,
				default: {
					leftString: '',
					leftDesc: '',
					rightdesc: ''
				}
			},
			showtype:{
				type: String,
				default:'1' //1的格式 0时00分 2的格式0:00
			},
			ismorrow:{
				type: Boolean,
				default:false
			},
			isSetZeroCheck:{
				type: Boolean,
				default:false
			},
		},
		// watch: {
		// 	objData: {
		// 			handler(newVal, oldVal){
		// 				console.log(newVal,'tttt') // 打印name变化的值
		// 					this.index[0] = newVal.rightdesc.split('-')[0]
		// 					this.index[1] = newVal.rightdesc.split('-')[1]
		// 			},
		// 			immediate: true,
		// 			deep: true
		// 		}
		// },
		data() {
			return {
				array: this.$constant.HourMinute,
				index: [0, 0],
			}
		},
		created() {
			let desc=JSON.parse(JSON.stringify(this.objData))
			this.index[0] = desc.rightdesc.split('-')[0]
			this.index[1] = desc.rightdesc.split('-')[1]
		},
		methods: {
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				// this.index = e.detail.value
				// this.$emit('eventBtn', e.detail.value)
				if(e.detail.value[0]==0&&e.detail.value[1]==0&&this.isSetZeroCheck){
					let desc=JSON.parse(JSON.stringify(this.objData))
					this.$set(this.index,0,Number(desc.rightdesc.split('-')[0]))
					this.$set(this.index,1,Number(desc.rightdesc.split('-')[1]))
					uni.showToast({
						title: '可用时长不可小于1分钟,请重新设置',
						icon: "none",
						duration:3000
					})
				}else{
					this.index = e.detail.value
					this.$emit('eventBtn', e.detail.value)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.uni-input {
		font-size: 28rpx;
	}
</style>
