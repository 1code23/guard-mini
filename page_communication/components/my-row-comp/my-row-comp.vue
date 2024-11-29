<template>
	<view>
		<view class="disfr jsb ac">
			<view class="">
				<view class="">
					<text class="fz32 fw400 color3">{{leftString}}</text>
				</view>
				<text class="fz28 color9">{{desc}}</text>
			</view>
			<view class="disfr ac">
				<text class="fz28 fw400 color9" v-if="isString">{{rightString}}</text>
				<text class="fz28 fw400 color9" @click="isclick">{{rightNum}}</text>
				<img src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" alt="" class='arrowBtn' v-if="!isString||showrightBtn" @click='eventBtn'>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-row-comp",
		props: {
			showrightBtn: {
				type: Boolean,
				default: false
			},
			isString: {
				type: Boolean,
				default: true
			},
			leftString:{
				type:String,
				default:''
			},
			desc:{
				type:String,
				default:''
			},
			rightString:{
				type:String,
				default:''
			},
			rightNum:{
				type:String,
				default:''
			},
			
		},
		data() {
			return {
				
			};
		},
		methods:{
			eventBtn(){
				this.$emit('eventBtn')
			},
			isclick(){
				if(!this.isString||this.showrightBtn){
					this.$emit('eventBtn')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>