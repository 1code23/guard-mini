<template>
	<view class="">
		<view class="fz32 fw600 color3" @click="uploadBtn">
			{{textstring}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			textstring: {
				type: String,
				default: '上传'
			}
		},
		data() {
			return {
fileList:[],
formData:{photo_url:[]}
			}
		},
		methods: {
			async uploadBtn() {
				if(uni.getStorageSync('isLoginTest')){
					uni.showToast({
						title:'试用模式不可修改头像',
						icon:"none",
					})
					return
				}
				// uni.showLoading({
				// 	mask: true,
				// 	title: '上传中...'
				// })
				// uploadFile 存储需要上传的文件
				let uploadFile = ''
				// 1.选择图片（这里只能单选）
				const res = await uni.chooseImage({
					count: 1, // 最多可以选择的图片张数，默认9
					// sizeType: ['compressed'],		// original 原图，compressed 压缩图，默认二者都有
					// sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
				});
				if (res.length < 2) { // 小于2则没有选择图片
					uni.hideLoading()
					uni.showToast({
						title:'请选择图片或图片不合法请重新上传',
						icon:"none",
						duration:3000
					})
					return
				}
				if (res[1].tempFiles[0].size>=10000000) { // 图片大小限制
					uni.hideLoading()
					uni.showToast({
						title:'上传图片过大',
						icon:"none",
						duration:3000
					})
					return
				}
				uploadFile = res[1].tempFilePaths[0]; // 拿到选择的文件
				var that1 = this;
				// 2.将选择的图片上传到目标服务器
				const arr = await uni.uploadFile({
					// 需要上传的地址
					// url: that1.vuex_uploadAction,
					url: that1.$constant.UPLOADURL+'/v1/wx/user/upload',
					// filePath  需要上传的文件
					filePath: uploadFile,
					name: 'file',
					timeout: 2000, // 超时时间
					header: { // HTTP 请求 Header, header 中不能设置 Referer。
						Authorization: 'Bearer '+uni.getStorageSync('token')||'', // 挂载请求头为用户的 token
					'X-Data-Raw': 'real',
					},
				});
				// console.log(arr);
				let data = JSON.parse(arr[1].data)
				if (data.code != 0) { // 图片上传失败了
					uni.hideLoading()
					uni.showToast({
						title:data.msg,
						icon:"none",
						duration:3000
					})
					return
				}
				// 上传成功(把上传成功后的文件路径 push 到页面需要显示的图片数据列表中)
				// that1.fileList.push(data.data.fullurl)
				// that1.formData.photo_url.push(data.data.url)
				this.$emit("uploadSuccess",data.data)
				// console.log(that1.fileList);
				// uni.hideLoading()
			}
		}

	}
</script>

<style lang="scss" scoped>
</style>
