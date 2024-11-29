import request from "@/utils/request.js";
export function getOpenid(params) {
	return request("GET", "/wx/mini/access", params)
}
// 非适用模式登录
export function userLogin(params) {
	return request("POST", "/v1/wx/user/login", params)
}
// 适用模式登录
export function guideLogin(params) {
	return request("POST", "/v1/wx/guide", params)
}
// 首页刷新
export function homeRefresh(id, params) {
	return request("PUT", `/v1/wx/user/elder/${id}/refresh`, params)
}
// 初始化缺省配置
export function initconfig(params) {
	return request("PUT", "/v1/wx/device/config", params)
}
// 获取个人信息及绑定孩子信息接口
export function userinfo(params) {
	return request("GET", "/v1/wx/user/profile", params)
}
// 更新用户信息接口
export function editUser(params) {
	return request("PUT", "/v1/wx/user", params)
}
// 更新用户信息接口
export function updateTelAllow(params = {}) {
	return request("PUT", "/v1/wx/contacts/updateTelAllow", params)
}
// 更新用户信息接口
export function contactsUnionApi(method = "GET", params = {}) {
	return request(method, "/v1/wx/contacts", params)
}
// 获取设备信息
export function configInfo(params) {
	return request("GET", "/v1/wx/device/configInfo", params)
}
// 更新用户信息接口
export function interceptDelete(apiName, params = {}) {
	return request("DELETE", `/v1/wx/intercept/${apiName}`, params)
}
// 围栏接口
export function fenceUnion(method = "GET", params = {}, apiName = "") {
	return request(method, `/v1/wx/fence${apiName}`, params)
}

// 获取个人信息及绑定孩子信息接口
// export function binddevice(params) {
//     return request("GET", "/device/bound?deviceId=08ac8b42-6131-4238-9141-67a3ad655a46", params)
// }

// 提交孩子信息绑定设备
export function deviceBound(params) {
	return request("POST", "/v1/wx/device/bound", params)
}
// 获取绑定设备接口
export function getBoundDevice(params) {
	return request("GET", "/v1/wx/device/bound", params)
}
// 获取手机号
export function requestphone(params) {
	return request("PUT", "/v1/wx/user/phone", params)
}
// 注销账号
export function cancelAccount(params) {
	return request("DELETE", "/v1/wx/user/cancel", params)
}
// 退出登录
export function logout(params) {
	return request("DELETE", "/v1/wx/user/logout", params)
}
//获取位置信息
export function getPlace(params) {
	// return request("PUT", "/v1/wx/user/phone", params)
}
// 更新孩子信息接口
export function undataChild(id, params) {
	return request("PUT", "/v1/wx/user/elder/" + id, params)
}
// 获取已绑定的孩子信息接口
export function getChild(params) {
	return request("GET", "/v1/wx/user/elder", params)
}
// 解除绑定孩子信息接口
export function deleteChild(id, params) {
	return request("DELETE", "/v1/wx/user/elder/" + id, params)
}
// 获取家庭成员信息接口
export function getMember(params) {
	return request("GET", "/v1/wx/member", params)
}
// 更新成员信息接口
export function editMember(id, params) {
	return request("PUT", "/v1/wx/member/" + id, params)
}
// 删除成员信息接口
export function deleteMember(id, params) {
	return request("DELETE", "/v1/wx/member/" + id, params)
}
// 转让管理员权限接口
export function changeMember(id, params) {
	return request("PUT", "/v1/wx/member/" + id + '/transfer', params)
}

// 拦截的短息列表接口
export function interceptMsgList(params) {
	return request("GET", "/v1/wx/intercept/msg", params)
}
// 拦截的电话列表接口
export function interceptTelList(params) {
	return request("GET", "/v1/wx/intercept/tel", params)
}

//消息页面接口
// 获取代办列表
export function todolist(params) {
	return request("GET", "/v1/wx/message/todolist", params)
}
// 获取最新代办列表
export function todolistLatest(params) {
	return request("GET", "/v1/wx/message/todolist/latest", params)
}
// 获取代办详情
export function todolistDetail(id, params) {
	return request("GET", "/v1/wx/message/todolist/" + id, params)
}
// 获取提醒列表
export function remindList(params) {
	return request("GET", "/v1/wx/message/remind", params)
}
// 待办列表审批
export function examineTodolist(id, params) {
	return request("PUT", "/v1/wx/message/todolist/" + id, params)
}
// 一键阅读所有未读消息
export function messageRead(params) {
	return request("PUT", "/v1/wx/message/read", params)
}
// 获取未读消息数量
export function messageCounter(params) {
	return request("GET", "/v1/wx/message/counter", params)
}


//耳机详情接口
export function earphoneInfo(params) {
	return request("POST", "/earphone/info", params)
}
// app使用时长统计
export function dataStatistics(params) {
	return request("POST", "/app/dataStatistics", params)
}
// 应用分时段使用记录
export function dayUseRecord(params) {
	return request("POST", "/app/dayUseRecord", params)
}
// 当天应用耗时列表
export function theDay(params) {
	return request("POST", "/app/theDay", params)
}
// 当天应用耗时列表详情
export function usetheDaydetail(params) {
	return request("POST", "/app/usedetail", params)
}
// 获取应用信息
export function appConfigInfo(params) {
	return request("GET", "/v1/wx/device/appConfigInfo", params)
}
// 应用设置
export function appConfig(params) {
	return request("PUT", "/v1/wx/device/appConfig", params)
}
// 修改应用设置
export function updateConfig(params) {
	return request("PATCH", "/v1/wx/device/config", params)
}
// 应用搜索
export function appSearch(params) {
	return request("GET", "/v1/wx/device/app/search", params)
}
// 获取帮助问题
export function getQuestions(params) {
	return request("GET", "/v1/wx/questions", params)
}
// 获取帮助问题详情
export function getQuestionDetail(id, params) {
	return request("GET", "/v1/wx/questions/" + id, params)
}
// 添加反馈问题接口
export function addFeedback(params) {
	return request("POST", "/v1/wx/feedback", params)
}
// 问题点赞和踩操作接口
export function evaluateQuestion(id, option, params) {
	return request("PUT", `/v1/wx/questions/${id}/options/${option}`, params)
}
// 购买会员列表
export function premiumGoods(params) {
	return request("GET", '/v1/wx/premium/goods', params)
}
// 支付
export function premiumOrder(params) {
	return request("POST", '/v1/wx/premium/order', params)
}

// 购买记录
export function premiumRecord(params) {
	return request("GET", `/v1/wx/premium/order`, params)
}
// 切换孩子
export function childrenCheckout(params) {
	return request("POST", `/v1/wx/user/elder/checkout`, params)
}