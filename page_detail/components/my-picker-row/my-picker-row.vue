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
					<view class="fz28 color9 uni-input disfr ac">{{index[0]}}时{{index[1]}}分<img
							src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" alt="" class='arrowBtn'></view>
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
			// console.log(this.index);
		},
		methods: {
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
				this.$emit('eventBtn', e.detail.value)
			},
			//设置时间限制时，判断设置时间是否小于使用时间
			init(val){
				this.$set(this.index,0,val.rightdesc.split('-')[0])
				this.$set(this.index,1,val.rightdesc.split('-')[1])
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-input {
		font-size: 28rpx;
	}
</style>
