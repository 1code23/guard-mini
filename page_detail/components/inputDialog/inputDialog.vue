<template>
	<view class="mainBox">
		<view class="disfr jsb ac fz28 color9 infobox" @click="editname()">
			<text class="fz32 color3">{{leftdesc}}</text>
			<view class="disfr ac plr6">
				<view class="mr14 fz32">{{info.checkName?info.checkName:placeholder}}</view>
				<image src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" mode="" class="arrowBtn"></image>
			</view>
		</view>
		<view>
			<uni-popup ref="inputDialog" type="dialog" :animation="false">
				<uni-popup-dialog  mode="input" :title="type" :before-close='true' :value="inputName"
					:placeholder="placeholder" @close="close" @confirm="dialogInputConfirm" cancelText='取消' confirmText='确定'>
				<!-- <input :type="type=='手机号'?'number':'text'" :value='inputName' :cursor-spacing="100" class="uni-input nicknameinput" focus -->
				<input :type="type=='手机号'?'number':'text'" :value='inputName' :cursor-spacing="100" class="uni-input nicknameinput"
					@input="inputvalue" :placeholder="placeholder" />
				</uni-popup-dialog>
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			Name: {
				type: String,
				default: '昵称'//选中的值
			},
			leftdesc: {
				type: String,
				default: '昵称'//左侧文字
			},
			type:{
				type: String,
				default: ''//中间文字类型 手机号或昵称
			}
		},
		data() {
			return {
				inputName:'',
				info: {
					checkName: ''
				},
				placeholder:'',
			}
		},
		watch:{
			Name(newval,oldval){
				this.info.checkName=JSON.parse(JSON.stringify(newval))
				this.inputName=JSON.parse(JSON.stringify(newval))
			}
		},
		created() {
			this.info.checkName=this.Name
			this.inputName=this.Name
			this.placeholder='请输入'+this.type
		},
		methods:{
			editname(){
				this.inputName=this.Name
				this.$refs.inputDialog.open()
			},
			close() {
				this.$refs.inputDialog.close()
				// this.inputName=''
			},
			inputvalue(e) {
				this.inputName = e.detail.value
			},
			dialogInputConfirm(val) {
				if (!val) {
					uni.showToast({
						title: this.placeholder,
						icon: 'none',
						duration:3000
					})
				}else if(this.type=='手机号'){
					if (this.$fun.checkPhone(val)) {
						uni.showToast({
							title: '请输入正确手机号',
							icon: 'none',
							duration:3000
						})
						return
					} else{
						this.$emit('inputEvent',val)
						this.$refs.inputDialog.close()
					}
				} else {
					if(this.type=='昵称'&&val.length>10){
						uni.showToast({
							title: '昵称不可超过10个字符，请重新输入',
							icon: 'none'
						})
						return
					}
					this.$emit('inputEvent',val)
					this.$refs.inputDialog.close()
				}
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.mainBox{
		background: #fff;
	}
	/deep/ .uni-button-color {
		color: #1BD17B;
	}
	.nicknameinput {
		text-align: left;
		color: #000;
		background: rgba(204,204,204, 0.1);
		width: 590rpx;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 48rpx;
		padding: 0rpx 40rpx;
	    font-size: 30rpx;
	}
	.plr6{
		padding: 0 6rpx;
	}
</style>
