<template>
	<view class="mainBox">
		<view class="disfr jsb ac fz32 color3">
			<text>{{leftString}}</text>
			<view class="">
				<!-- <text>{{checkvalue}}</text> -->
				<view class="">
					<picker :disabled="disabled" @change="bindPickerChange" :value="index" :range="array" mode='selector'
						:range-key='rangekey'>
						<view class="color9 disfr ac fz28">
							{{showData}}
							<image src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" mode="" class="arrowBtn"></image>
						</view>
					</picker>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "picker-radio",
		props: {
			leftString: {
				type: String,
				default: ''
			},
			array: {
				type: Array,
				default: []
			},
			rangekey: { //关联字段
				type: String,
				default: 'label'
			},
			index: { //选择的数组下标
				type: String,
				default: '0'
			},
			showData:{
				type: String,
				default: ''
			},
			disabled:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
              
			};
		},
		methods: {
			bindPickerChange: function(e) {
				this.$emit('pickerChange', e.detail.value)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		background: #FFFFFF;
	}
</style>
