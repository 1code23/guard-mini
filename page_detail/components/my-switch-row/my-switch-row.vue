<template>
	<view>
		<view class=" ac djb">
			<view class="leftBox fw400">
				<view class=" fz32 color3">{{leftTitle}}</view>
				<view class="fz28 color9 mt8">{{leftDesc}}</view>
			</view>
			<view class="rightBox">
				<switch :checked='ischecked' @change="switchChange" color='#1BD17B' style="transform:scale(0.7)" v-if="handType==='switch'"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-radio-row",
		props: {
			ischecked:{
				type:Boolean,
				default: false
			},
		handType: {
			type: String,
			default: 'switch'
		},
		leftTitle:{
			type:String,
			default: ''
		},
		leftDesc:{
			type:String,
			default: ''
		},
		},
		data() {
			return {
				
			};
		},
		methods: {
		        switchChange: function (e) {
		            // console.log('switch1 发生 change 事件，携带值为', e.detail.value)
					this.$emit('rightChange',e.detail.value)
		        },
		    }
	}
</script>

<style lang="scss">
.leftBox{
	max-width: 95%;
	margin-bottom: 8rpx;
}
</style>