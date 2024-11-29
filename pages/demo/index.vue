<template>
  <view class="demo">
	  <scrolllist ref="list"  @load="load" @refresh="refresh">
	            11
	         </scrolllist>
    <!-- <ss-upload-image :url="url" :file-list="fileList" :name="name" @on-success="onSuccess" @on-error="onError" @on-remove="onRemove" @on-process="onProcess"></ss-upload-image> -->
  </view>
</template>

<script>
	import scrolllist from '@/components/scroll-list/scroll-list.vue'
  // import ssUploadImage from '@/components/ss-upload-image/ss-upload-image.vue'
  export default {
    data() {
      return {
        fileList: [],
        url: 'http://',
        name: 'file',
      }
    },
    components: {
      // ssUploadImage
	  scrolllist
    },
    methods: {
		// 刷新数据
		refresh(){
			console.log(11);
			this.$refs.list.refreshSuccess({ list: [], total: 50 })
		},
		// 加载数据
		load(){
			console.log(22);
			this.$refs.list.loadSuccess({ list: [], total: 50 })
		},
      // 上传成功
      onSuccess(res) {
        // 响应示例
        // {
        //    code: 0,
        //    data: {
        //      image_url: 'http://www.xxxxx.png'
        //    },
        //    message: '上传成功'
        // }
        if (res.code === 0) {
          this.fileList.push(res.data.image_url)
        }
        console.log(res)
      },
      // 上传进程
      onProcess(res) {
        console.log(res)
      },
      // 上传失败
      onError(err) {
        console.log(err)
      },
      // 移除
      onRemove(index) {
        this.fileList.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .demo {
    // padding: 40upx 20upx;
  }
</style>
