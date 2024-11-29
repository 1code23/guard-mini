<template>
	<view>
		<view class="classmb72 ac djb" v-for="(item,index) in switchList" :key="index">
			<view class="leftBox fw400">
				<view class=" fz32 color3">{{item.leftTitle}}</view>
				<view class="fz28 color9 mt8">{{item.leftDesc||''}}</view>
			</view>
			<view class="rightBox" v-if="handType">
				<!-- <switch :checked='item.ischecked' @change="switchChange" color='#1BD17B' style="transform:scale(0.8)" /> -->
				<helangAsyncSwitch :checked="item.ischecked" @change="switchChange(index)"></helangAsyncSwitch>
			</view>
		</view>
	</view>
</template>

<script>
	import helangAsyncSwitch from '../helang-asyncSwitch/helang-asyncSwitch.vue'
	export default {
		components: {
			helangAsyncSwitch
		},
		name: "my-asyncswitch-row",
		props: {
			arrayList: {
				type: Array,
				default: []
			},
			handType: {
				type: Boolean,
				default: true
			}
			// 	ischecked:{
			// 		type:Boolean,
			// 		default: false
			// 	},
			// leftTitle:{
			// 	type:String,
			// 	default: ''
			// },
			// leftDesc:{
			// 	type:String,
			// 	default: ''
			// },
		},
		data() {
			return {
				switchList: []
			};
		},
		created() {
			this.switchList = JSON.parse(JSON.stringify(this.arrayList))
		},
		methods: {
			changecheck(arr){
				this.switchList = arr
			},
			switchChange: function(index) {
				let arr = this.switchList.filter((item, index, arr) => {
					return item.ischecked;
				})
				if (arr.length > 0 && arr[0].leftTitle !== this.switchList[index].leftTitle) {
					// uni.showToast({
					// 	title: '开关不能同时开启',
					// 	icon: 'none'
					// })
					this.switchList.forEach(item=>{
						item.ischecked=false
					})
					this.switchList[index].ischecked = true
					this.$emit('rightChange',this.switchList[index])
				} else {
					this.switchList[index].ischecked = !this.switchList[index].ischecked
					this.$emit('rightChange',this.switchList[index])
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.leftBox {
		max-width: 95%;
		margin-bottom: 8rpx;
	}

	.classmb72 {
		margin-bottom: 72rpx;
	}

	.rightBox {
		margin-right: -20rpx;
	}
	.mt8{
		margin-top: 8rpx;
	}
</style>
