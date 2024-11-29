<template>
	<view class="">
		<view class="disfr jsb ac fz32 color3">
			<text>{{leftString}}</text>
			<view class="">
				<view class="">
					<!-- <picker @change="bindPickerChange" :value="index" :range="array" mode='selector'
						:range-key='rangekey'>
						<view class="color9 disfr ac">
							{{showData}}
							<image src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" mode="" class="arrowBtn"></image>
						</view>
					</picker> -->
					<picker mode="date" :value="date" fields='month' :start="startDate" :end="endDate" @change="bindDateChange">

						<view class="color9 disfr ac">
							{{date | strSlice}}
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
		name: "picker-time",
		props: {
			leftString: {
				type: String,
				default: ''
			},
			checkdate:{
				type: String,
				default: ''
			}
		},
		data() {
			// const currentDate = this.getDate({
			// 	format: true
			// })
			return {
				date: null,
				// startDate:'2022-01',
				endDate:'2060-12',
				startDate:'1980-01',
			};
		},
		watch:{
			checkdate: {
			  handler: function (newval,oldval) {
				
				this.date=newval+'-30'
				// this.endDate=newval
			  },
			  deep: true,
			  immediate: true
			}
		},
		// computed: {
		//  startDate() {
		// 		return this.getDate('start');
		// 	},
		// 	endDate() {
		// 		return this.getDate('end');
		// 	}
		// },
		methods: {
			bindDateChange: function(e) {
				// this.date = e.detail.value
				// console.log(e.detail.value,'123456678');
				this.$emit('pickerdateChange',e.detail.value)
			},
			// getDate(type) {
			// 	const date = new Date();
			// 	let year = date.getFullYear();
			// 	let month = date.getMonth() + 1;
			// 	let day = date.getDate();

			// 	if (type === 'start') {
			// 		year = year - 60;
			// 	} else if (type === 'end') {
			// 		year = year + 2;
			// 	}
			// 	month = month > 9 ? month : '0' + month;
			// 	day = day > 9 ? day : '0' + day;
			// 	return `${year}-${month}-${day}`;
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		background: #FFFFFF;
	}
</style>
