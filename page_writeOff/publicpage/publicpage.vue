<template>
	<view class="mainBox">
		<view class="fz28 color6 questionItem">
		  <web-view :src="url"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList:[
					{id:1,value:'隐私政策',url:'https://policy.droigroup.com/protocols/appVerProtocol/app_43/1/privacy.html'},
					{id:2,value:'用户协议',url:'https://policy.droigroup.com/protocols/appVerProtocol/app_43/1/user_agreement.html'},
					{id:3,value:'权限申请与使用情况说明',url:'https://policy.droigroup.com/protocols/appVerProtocol/app_43/1/app_privilege.html'},
					{id:4,value:'个人信息收集清单',url:'https://policy.droigroup.com/protocols/appVerProtocol/app_43/1/person_info_list.html'},
					{id:5,value:'会员服务协议',url:'https://policy.droigroup.com/protocols/teenagerParentXcx/member_protocol.html'},
					{id:6,value:'隐私政策（简明版）',url:'https://policy.droigroup.com/protocols/appVerProtocol/app_43/1/privacy_concise.html'},
					],
				content:'',
				url:''
			};
		},
		onLoad(query) {
			let type=query.type
			let obj=this.typeList.find(item => item.id == type)
			this.url=obj.url
			uni.setNavigationBarTitle({
			    title: obj.value
			})
		}
	}
</script>

<style lang="scss" scoped>
.mainBox {
  padding: 32rpx 40rpx;
  // height: 100vh;
  box-sizing: border-box;
  }
</style>
