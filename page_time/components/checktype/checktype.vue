<template>
	<view class="">
		<view class="disfr jsb ac fz28 color9 infobox" @click="editname">
			<text class="fz32 color3">{{leftdesc}}</text>
			<view class="disfr ac ">
				<view class="mr14 ell">
				<!-- {{checkday}} -->
					<!-- <view class="" v-if="checkday=='周一,周二,周三,周四,周五'">周一至周五</view>
					<view class="mt8" v-else>{{checkday}}</view> -->
					<view class="mt8">{{checkday | weekFilter}}</view>
				</view>
				<image src="https://apmarket.tt286.com/teeny/icon/arrow2x.png" mode="" class="arrowBtn"></image>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="dialog" title="重复" message="成功消息" :duration="2000" :before-close="true"
				@close="close" @confirm="confirm">
				<view class="fc weekBox">
					<!-- <radio-group @change="radioChange"> -->
					<view v-for="(item, index) in dateList" class="dayitem" :key="item.id">
						<label class="disfr ac jsb">
							<view class="fz28 color3">{{ item.text }}</view>
							<uni-icons type="circle" color="#DEDEDE" size="20" v-show="!item.selected" @click="checkbox(index)"></uni-icons>
							<uni-icons type="checkbox-filled" color="#1BD17B" size="20" v-if="item.selected" @click="checkbox(index)"></uni-icons>
							<!-- <radio color="#1BD17B" style="transform:scale(0.7)" :value="String(index)" :checked="item.selected" @click.native="checkbox(index)" /> -->
						</label>
					</view>
					<!-- </radio-group> -->
				</view>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: {
			// Name: {
			// 	type: String,
			// 	default: '昵称'//选中的值
			// },
			checkday: {
				type: String,
				default: ''//选择的数据
			},
			leftdesc: {
				type: String,
				default: '名称' //左侧文字
			},
		},
		data() {
			return {
				dateList: [{
					id: 1,
					text: '周一',
					selected: false,
				}, {
					id: 2,
					text: '周二',
					selected: false,
				}, {
					id: 3,
					text: '周三',
					selected: false,
				}, {
					id: 4,
					text: '周四',
					selected: false,
				}, {
					id: 5,
					text: '周五',
					selected: false,
				}, {
					id: 6,
					text: '周六',
					selected: false,
				}, {
					id: 7,
					text: '周日',
					selected: false,
				}],
			}
		},
	
		mounted() {
			this.init()
		},
		methods: {
			init(){
				let str=this.checkday.split(',')
				for (let i = 0; i < str.length; i++) {
					for (let j = 0; j < this.dateList.length; j++) {
				       if(str[i]==this.dateList[j].text){
						    this.dateList[j].selected=true
					   }
					}
				}
			},
			// 选项框点击事件，参数是数据的下标
			checkbox(index) {
				// 选中的状态下再次点击，即为取消选中
				if (this.dateList[index].selected) {
					this.dateList[index].selected = false;
					// this.selected.delete(index); // 然后删除对应key即可
				}
				// 未选中状态下点击
				else {
					this.dateList[index].selected = true;
					// this.selected.set(index, this.dateList[index].id);
				}
				// console.log(this.dateList,'xuanz',this.selected);
			},
			radioChange(e){
				console.log(e);
			},
			editname() {
				this.dateList=[]
				this.dateList=JSON.parse(JSON.stringify(this.$constant.dateList))
				this.init()
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			confirm() {
				let arr=[]
				for(let i=0;i<this.dateList.length;i++){
					if(this.dateList[i].selected){
						arr.push(this.dateList[i].text)
					}
				}
				// console.log(arr,'保存的数据');
				this.$emit('save',arr.join(','))
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
.weekBox{
	.dayitem{
	margin: 14rpx 0;
	}
	width: 100%;
}
/deep/ .uni-popup__error{
	color: #333333;
}
</style>
