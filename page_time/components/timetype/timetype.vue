<template>
	<view class="mainBox">
		<view class="disfr jsb ac fz28 color9 infobox" @click="editname()">
			<text class="fz32 color3">{{leftdesc}}</text>
			<view class="disfr ac ">
				<text class="mr14">{{info.checkName}}</text>
				<image src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" mode="" class="arrowBtn"></image>
			</view>
		</view>
		<view>
			<uni-popup ref="inputDialog" type="dialog">
				<!-- <uni-popup-dialog  mode="input" title="名称" :before-close='true' :value="inputName"
				  cursor-spacing="180" placeholder="请输入名称" @close="close" @confirm="dialogInputConfirm" cancelText='取消' confirmText='确定'>
				</uni-popup-dialog> -->
				<uni-popup-dialog mode="input" title="名称" :before-close="true"
					:value="inputName" placeholder="请输入名称" @close="close" @confirm="dialogInputConfirm" cancelText="取消"
					confirmText="添加">
					<input type="text" :value='inputName' :cursor-spacing="100" class="uni-input nicknameinput"
						@input="inputsurl" placeholder="请输入名称" />
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
				default: '名称'//左侧文字
			},
		},
		data() {
			return {
				inputName:'',
				info: {
					checkName: ''
				}
			}
		},
		watch:{
			Name(newval,oldval){
				this.info.checkName=JSON.parse(JSON.stringify(newval))
				this.inputName=JSON.parse(JSON.stringify(newval))
			}
		},
		methods:{
			editname(){
				this.inputName=this.Name
				this.$refs.inputDialog.open()
			},
			close() {
				this.inputName=''
				this.$refs.inputDialog.close()
			},
			inputsurl(e) {
				this.inputName = e.detail.value
			},
			dialogInputConfirm(val) {
				if(val.length>10){
					uni.showToast({
						title:'不可超过10个字符,重新输入',
						icon:'none'
					})
				    return	
				}
			  // 正则表达式匹配表情符号
			  const emojiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|[\u2600-\u27BF]/g;
			  // 如果输入包含表情，进行替换
			  if (emojiRegex.test(val)) {
				uni.showToast({
				  title: '禁止输入表情',
				  icon: 'none',
				});
				return
			  } 
				if (!val) {
					uni.showToast({
						title: '请输入名称',
						icon: "error"
					})
				} else {
					this.$emit('inputEvent',val)
					this.$refs.inputDialog.close()
				}
			}
		}
	}
	
</script>

<style lang="scss" >
	/deep/ .uni-button-color {
		color: #1BD17B;
	}
	/deep/ .uni-dialog-input {
		border-radius: 50rpx;
		color: #000;
		font-size: 30rpx;
	}
	.nicknameinput {
		text-align: left;
		color: #333;
		background: rgba(189, 189, 189, 0.13);
		border-radius: 48rpx;
		padding: 20rpx 30rpx;
		width: 100%;
		font-size: 30rpx;
	}
</style>
