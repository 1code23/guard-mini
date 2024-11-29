<template>
	<view class="mainBox">
		<view class="disfr jsb ac fz32 color3">
			<text>{{leftString}}</text>
			<view class="">
				<view class="">
					<picker @change="classifyChange" @columnchange="columnchange" :value="classifyIndex"
						:range="classifyArr" mode='multiSelector' range-key='name'>
						<view class="color9 disfr ac">
							{{name | classifyArr}}
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
		name: "picker-multiselector",
		props: {
			leftString: {
				type: String,
				default: ''
			},
			// array: {
			// 	type: Array,
			// 	default: []
			// },
			// rangekey: { //关联字段
			// 	type: String,
			// 	default: 'label'
			// },
			checkindex: { //选择的数组下标
				type: String,
				default: '0,0'
			},
			showData: {
				type: String,
				default: ''
			}
		},
		watch:{
			checkindex: {
			  handler: function (newval,oldval) {
				this.classifyIndex[0]=parseInt(newval.split(',')[0])
				this.classifyIndex[1]=parseInt(newval.split(',')[1])
				this.getAllClassify()
			  },
			  deep: true,
			  immediate: true
			}
		
		},
		data() {
			return {
				dataSource: [{
						id: 1,
						name: '小学',
						child: [{
								id: 2,
								name: '一年级'
							},
							{
								id: 3,
								name: '二年级'
							},
							{
								id: 4,
								name: '三年级'
							},
							{
								id: 5,
								name: '四年级'
							},
							{
								id: 6,
								name: '五年级'
							},
							{
								id: 7,
								name: '六年级'
							},
						],
					},
					{
						id: 8,
						name: '初中',
						child: [{
								id: 9,
								name: '初一'
							},
							{
								id: 10,
								name: '初二'
							},
							{
								id: 11,
								name: '初三'
							},
						],
					},
					
					{
						id: 12,
						name: '高中',
						child: [{
							id: 13,
							name: '高一'
						},{
							id: 14,
							name: '高二'
						},{
							id: 15,
							name: '高三'
						}]
					}
					
				],
				name: '请选择分类',
				classifyArr: [
					[],
					[]
				], // picker - 数据源
				classifyIndex: [0, 0], // picker - 选择的年级下标
				childArr: [], // 二级分类数据源
			};
		},
		created() {
			// 获取数据源并分出一级二级分类
			this.getAllClassify()
		},
		methods: {
			// 获取数据源并分出一级二级
			getAllClassify() {
				let dataLen = this.dataSource.length;
				for (let i = 0; i < dataLen; i++) {
					// 将数据源中的二级分类 push 进 childArr，作为二级分类的数据源
					this.childArr.push(this.dataSource[i].child)
				};

				// 一级分类的数据源
				this.classifyArr[0] = this.dataSource;

				// 第一次打开时，默认给一级分类添加它的二级分类
				this.classifyArr[1] = this.childArr[0]
				// console.log(this.classifyArr,'hao',this.classifyIndex,this.classifyIndex[0]);		
				this.$set(this.classifyArr, 1, this.childArr[this.classifyIndex[0]])
				// console.log((this.classifyArr[0])[this.classifyIndex[0]].name,((this.classifyArr[0])[this.classifyIndex[0]]).child[this.classifyIndex[1]].name,'ceshi');
				let gradename=(this.classifyArr[0])[this.classifyIndex[0]].name;
				let classname=((this.classifyArr[0])[this.classifyIndex[0]]).child[this.classifyIndex[1]].name
				this.name=gradename+','+classname
				
			},

			// 选择年级分类
			classifyChange(e) {
				let value = e.target.value;
				this.classifyIndex = value;

				if (this.classifyArr[0].length != 0) {
					this.name = this.classifyArr[0][this.classifyIndex[0]].name
				};

				if (this.classifyArr[1].length != 0) {
					this.name += ',' + this.classifyArr[1][this.classifyIndex[1]].name
				}
				this.$emit('submitClass',value)
			},
			// 获取二级分类
			columnchange(e) {
				// 当滚动切换一级分类时，为当前的一级分类添加它的子类
				if (e.detail.column == 0) {
					// #ifdef H5
					// 在小程序中直接赋值无效  H5 可直接赋值
					this.classifyArr[1] = this.childArr[e.detail.value]
					// #endif

					// #ifdef MP-WEIXIN
					// 在 H5 环境下 $set 会导致一级分类无法滚动， 小程序正常运行
					this.$set(this.classifyArr, 1, this.childArr[e.detail.value])
					// #endif
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		background: #FFFFFF;
	}
</style>
