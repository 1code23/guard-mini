export const MAXSIZE = 3000; //后端接口每个page最大size
export const USERINFO = "droi.sdk-report.userInfo"; // 存储在localStorage里用户信息的key
export const LASTTIME = "droi.sdk-report.lastTIme"; // 存储在localStorage里最后一次点击的时间的key
export const POWERTREE = "droi.sdk-report.powerTree";
export const TIMEOUT = 2 * 60 * 60 * 1000; //超时时间2h
 export const ISENTRYPT = false; //是否加密
// export const UPLOADURL = 'https://hc-api.oo523.com'; //正式环境
// export const UPLOADURL = 'http://10.20.40.244:8092'; //本地开发测试环境
export const UPLOADURL = 'https://guard-test.work.go-node.com:10445'; //公网环境
// export const UPLOADURL = 'http://192.168.48.162:8092'; //本地环境 彭
// export const UPLOADURL = 'http://192.168.48.222:8092'; //本地环境 扶
// 应用设置类型
export const appsetType = [{
		key: 4,
		value: "跟随设备",
		class: "colorRed"
	},
	{
		key: 2,
		value: "使用限制",
		class: "colorRed"
	},
	{
		key: 1,
		value: "始终允许",
		class: "colorGreen"
	},
];
// 首页菜单列表
export const menuArray = [
	{
		img: "https://hsapmarket.zy845.com/guard/wx/icon_banner1.png",
		menuName: "电子围栏",
		url: "/page_home/elecFence/elecFence",
	},
	{
		img: "https://hsapmarket.zy845.com/guard/wx/icon_banner2.png",
		menuName: "历史轨迹",
		url: "/page_home/track/track",
	},
	{
		img: "https://hsapmarket.zy845.com/guard/wx/icon_banner3.png",
		menuName: "骚扰拦截",
		url: "/page_home/harass/harass",
	},
]
export const HourMinute = (function() {
    const hours = [];
    const minutes = [];
    
    for (let i = 0; i < 24; i++) {
        hours.push(`${i < 10 ? '0' : ''}${i}时`);
    }
    
    for (let j = 0; j < 60; j++) {
        minutes.push(`${j < 10 ? '0' : ''}${j}分`);
    }
    
    return [hours, minutes];
})();
export const dateList = [{
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
}];
export const useTimeList = [{
	label: '10分钟',
	value: 10
}, {
	label: '20分钟',
	value: 20
}, {
	label: '30分钟',
	value: 30
}, {
	label: '40分钟',
	value: 40
}, {
	label: '50分钟',
	value: 50
}, {
	label: '60分钟',
	value: 60
}, {
	label: '自定义',
	value: -1
}, {
	label: '不限制',
	value: 0
}];