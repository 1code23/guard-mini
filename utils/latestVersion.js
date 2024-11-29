/* 系统版本提示更新  导出此方法*/
export function getLatestVersion(){
	/**
	 *  是否需要提示用户使用最新版
	 * 先判断该api是否可用uni.getUpdateManager
	 */
	if(uni.canIUse('getUpdateManager')){
	 const updateManager = uni.getUpdateManager()
	 updateManager.onCheckForUpdate((res)=>{
		// 判断是否有新本可使用
		if (res.hasUpdate) {
		// 有的话强制下载最新版
		updateManager.onUpdateReady(()=>{
			uni.showModal({
			  title: '更新提示',
			  content: '小程序已发布新版本，是否重启?',
			  success: (res) => {
					if (res.confirm) {
					  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启(说白了就是重启,使用最新版本)
					  updateManager.applyUpdate()
					}
          //用户点击取消
          else if (res.cancel) {
            //强制用户更新，弹出第二次弹窗
            uni.showModal({
                title: '提示',
                content: '小程序已发布新版本，是否重启?',
                showCancel: false, //隐藏取消按钮
                success: function(res) {
                    //第二次提示后，强制更新          
                    if (res.confirm) {
                        // 当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        }
			  }
			})
		})
		}
	 })
	 // 新的版本下载失败  提示用户重新打开
	//  updateManager.onUpdateFailed(function () {
	// 	uni.showModal({
	// 	  title: '已经有新版本了哟~',
	// 	  content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
	// 	})
	//  })
	}
}