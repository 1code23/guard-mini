<template>
	<view class="jurisdictionBox">
		<view class="fz24 fw400 color9 classmb24">
			网址过滤
		</view>
		<view class="">
			<myasyncswitch v-if="isRequired" ref="myasyncswitch" :arrayList="arrayList" @rightChange='visitBtn'></myasyncswitch>
		</view>
		<view class="classmb72" @click.stop='godetailPage(1)' v-if="isRequired">
			<myrow leftString='黑名单' :isString='true' :rightNum='rightBlacklistNum' :showrightBtn='true'
				@eventBtn='godetailPage1(1)'></myrow>
		</view>
		<view class="" @click.stop='godetailPage(2)' v-if="isRequired">
			<myrow leftString='白名单' :isString='true' :rightNum='rightWhitelistNum' :showrightBtn='true'
				@eventBtn='godetailPage1(2)'></myrow>
		</view>
		<view>
			<TestDialog ref='testDialog'></TestDialog><!-- 试用模式首次点击提示框 -->
		</view>
	</view>
</template>

<script>
	import myasyncswitch from '../components/my-asyncswitch-row/my-asyncswitch-row.vue'
	import myrow from '../components/my-row-comp/my-row-comp.vue'
	import TestDialog from "../components/testdialog/testdialog.vue"
	import {
		mapGetters
	} from "vuex"
	export default {
		computed: {
			...mapGetters([ "binduser"]), //获取vuex中存的数据
		},
		components: {
			myasyncswitch,
			TestDialog,
			myrow
		},
		data() {
			return {
				rightNum: null,
				id: null,
				// showwhiteList:false,
				// showblackList:false,
				arrayList: [{
					leftTitle: '禁止访问',
					leftDesc: '禁止访问黑名单网站',
					ischecked: false
				}, {
					leftTitle: '仅允许访问',
					leftDesc: '仅允许访问白名单网站',
					ischecked: false
				}],
				urlList:[],
				blacklist:[],
				rightBlacklistNum:0,
				whitelist:[],
				rightWhitelistNum:0,
				isRequired:false,
				kind:1
			};
		},
		onShow() {
			this.init(true)
		},
		onHide() {
			this.isRequired=false
		},
		methods: {
			init(isLoad) {
				this.isRequired=true
				this.$apiCom.configInfo({
					childId:this.binduser.id,
					isLoad:isLoad?true:false
				}).then(res => {
					if (res.code == 0) {
						this.id=res.data.Id
						this.urlList=res.data.urlList
						this.blacklist=res.data.blacklist
						this.whitelist=res.data.whitelist
						// if(res.data.urlList){		
						this.rightBlacklistNum=res.data.blacklist.length+'个'
						this.rightWhitelistNum=res.data.whitelist.length+'个'
						// }else{
						// 	this.rightNum='0个'
						// }
						if(res.data.urlVerify==0){
							this.arrayList[0].ischecked=false
							this.arrayList[1].ischecked=false
							this.kind=0
							this.handShow(false,false)
							
						}else if(res.data.urlVerify==1){
							this.arrayList[1].ischecked=false
							this.arrayList[0].ischecked=true
							this.kind=1
							this.handShow(true,false)
						
						}else if(res.data.urlVerify==2){
							this.arrayList[0].ischecked=false
							this.arrayList[1].ischecked=true
							this.kind=2
							this.handShow(false,true)
						}
						this.id = res.data.Id
						this.$refs.myasyncswitch.changecheck(this.arrayList)
					};
				
						
				})
			},
			visitBtn(val) {
				let configvalue=null
				let urlList={}
				if (val.leftTitle==="仅允许访问"&&val.ischecked) {
					configvalue=2
					// this.handShow(false,true)
					urlList={
					 op:'replace',
						path: "/whitelist",
						value: this.whitelist
					}
				}else if(val.leftTitle==="禁止访问"&&val.ischecked){
					configvalue=1
					urlList={
					 op:'replace',
						path: "/blacklist",
						value: this.blacklist
					}
					// this.handShow(true,false)
				}else{
					configvalue=0
					// this.handShow(false,false)
				}	
				this.kind=configvalue
				
				this.editConfig(configvalue,'urlVerify',urlList)
			},
			handShow(showblack,showwhite){
				this.showblackList=showblack
				this.showwhiteList=showwhite
			},
			async editConfig(label,configvalue,urlList){
				let obj
				if(JSON.stringify(urlList)=='{}'){
					 obj={childId:this.binduser.id,opValue:[
						{path:'/'+configvalue,value:label,op:'replace',}
						]}
				}else{
					obj={childId:this.binduser.id,opValue:[
						{path:'/'+configvalue,value:label,op:'replace',},
						urlList
						]}
				}
				
				let res=await this.$apiCom.updateConfig(obj)
				if(uni.getStorageSync('testClickNum')==1&&uni.getStorageSync('isLoginTest')){//试用模式下第一次点击
					this.$refs.testDialog.opendialog()
				}
				if(res.code==0){
					if(uni.getStorageSync('testClickNum')!=1&&uni.getStorageSync('isLoginTest')){
						uni.showToast({
							title:'操作成功',
							duration:3000
						})
					}
					// this.init()
				}
			},
			godetailPage(val) {
				// 1黑名单 2白名单
				let dataObj={blacklist:this.blacklist,whitelist:this.whitelist,type:val,kind:this.kind}
				let list = encodeURIComponent(JSON.stringify(dataObj))
				let	gourl = '/page_communication/whiteList/whiteList?list='+list	
				uni.navigateTo({
					url: gourl
				});
			},
			godetailPage1(){}
		}
	}
</script>

<style lang="scss" scoped>
	.jurisdictionBox {
		padding: 24rpx 40rpx;

		.radioBox {
			margin-top: 58rpx;
		}
	}

	.classmb24 {
		margin-bottom: 34rpx;
	}

	.classmb72 {
		margin-bottom: 72rpx;
	}

	.mb76 {
		margin-bottom: 76rpx;
	}
	/deep/ .uni-popup .uni-popup__wrapper {
		border-radius: 32rpx;
		width: 670rpx;
		height: 230rpx;
	}
</style>
