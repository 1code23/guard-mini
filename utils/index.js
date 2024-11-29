// 时间戳转字符串方法 getDateString(1644768000000)
const token = 'token'
export function getDateString(stamp) {
	const d = new Date(parseInt(stamp, 0))
	const month =
		d.getMonth() + 1 < 10 ? 0 + '' + (d.getMonth() + 1) : d.getMonth() + 1
	const day = d.getDate() < 10 ? 0 + '' + d.getDate() : d.getDate()
	const hour = d.getHours() < 10 ? 0 + '' + d.getHours() : d.getHours()
	const minute = d.getMinutes() < 10 ? 0 + '' + d.getMinutes() : d.getMinutes()
	const second = d.getSeconds() < 10 ? 0 + '' + d.getSeconds() : d.getSeconds()
	const dateString =
		d.getFullYear() +
		'-' +
		month +
		'-' +
		day +
		' ' +
		hour +
		':' +
		minute +
		':' +
		second
	return dateString
}
//是否为网址
export function IsURL(strUrl) {
	var regular = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(:\d{2,5})?(\/[^\s]*)?(\?[^\s]*)?$/
	if (regular.test(strUrl)) {
		return true;
	} else {
		return false;
	}
}
export function dateType(type) {
	if (type == 0) {
		return {
			startTime: YMD(),
			endTime: YMD()
		}
	} else if (type == 1) {
		return {
			startTime: yesterday(),
			endTime: yesterday()
		}
	} else if (type == 2) {
		return {
			startTime: weekFirt(),
			endTime: weekLast()
		}
	} else if (type == 3) {
		return {
			startTime: getLastWeekStartDate(),
			endTime: getLastWeekEndDate()
		}
	}
}
// 当前时间转为年月日 2022-12-12  今天日期
export function YMD() {
	let date = new Date();
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + m + '-' + d
}
// 昨天日期 2022-12-11
export function yesterday() {
	var timenow = new Date();
	timenow.setDate(timenow.getDate() - 1); // 设置天数 -1 天，昨天的日期
	var y = timenow.getFullYear(); // 年
	var m = timenow.getMonth() + 1; // 月
	m = m < 10 ? '0' + m : m;
	var d = timenow.getDate(); // 日
	d = d < 10 ? ('0' + d) : d;
	var yesterdayTime = y + '-' + m + '-' + d; // 字符串拼接成自己想要的时间格式，现在是 yyyy/mm/dd 格式
	return yesterdayTime;
}
//分钟转为小时 分钟  minuteType(80) 【1,20】
export function minuteType(val) {
	if (val) {
		return [Math.floor(val / 60), (val % 60)]
	} else {
		return [0, 0]
	}
}
//分钟转为小时 分钟  minuteType(80) 1小时20分钟
export function minuteHourType(val) {
	if (val) {
		if (Math.floor(val / 60) > 0) {
			return Math.floor(val / 60) + '小时' + (val % 60) + '分钟'
		} else {
			return (val % 60) + '分钟'
		}
	} else {
		return ''
	}
}
// 秒转分钟 30秒  secondType(30) 1分钟
export function secondType(val) {
	if (val) {
		// return Math.ceil(val / 60) //向上取整  secondType(30) 1分钟
		return Math.round((val / 60) * 10) / 10 //保留一位小数 secondType(30) 0.5分钟
	} else {
		return ''
	}
}
// 秒转小时 3600秒  secondType(30) 1小时
export function HourType(val) {
	if (val) {
		// return Math.ceil(val / 60) //向上取整  secondType(30) 1分钟
		return Math.round((val / 3600) * 10) / 10 //保留一位小数 secondType(30) 0.5分钟
	} else {
		return ''
	}
}
const farmatT = time => {
	let date = new Date(time);
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + m + '-' + d
}
//本周第一天
export function weekFirt() {
	let now = new Date();
	let currentDayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
	// 计算本周的第一天（周一）
	// 如果今天是星期日，则减去 6 天；否则，减去当前星期几 - 1
	let daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
	let weekStartDate = new Date(now.setDate(now.getDate() - daysToSubtract));

	// 格式化为 YYYY-MM-DD
	const year = weekStartDate.getFullYear();
	const month = String(weekStartDate.getMonth() + 1).padStart(2, '0'); // 月份从0开始
	const day = String(weekStartDate.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}
// 本周最后一天
export function weekLast() {
	let now = new Date();
	let currentDayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)

	// 计算到本周的最后一天（周日）
	// 如果今天是星期日，则需要返回今天的日期；否则，计算到下一个周日
	let daysToAdd = currentDayOfWeek === 0 ? 0 : 7 - currentDayOfWeek;
	let weekEndDate = new Date(now.setDate(now.getDate() + daysToAdd));

	// 格式化为 YYYY-MM-DD
	const year = weekEndDate.getFullYear();
	const month = String(weekEndDate.getMonth() + 1).padStart(2, '0'); // 月份从0开始
	const day = String(weekEndDate.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

//获得上周的开始日期
export function getLastWeekStartDate() {
	let now = new Date();
	let currentDayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
	// 计算当前日期是本周的第几天（周一为1，周日为7）
	let daysSinceMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

	// 计算上周一的日期
	let lastWeekStartDate = new Date(now.setDate(now.getDate() - daysSinceMonday - 7));

	// 格式化为 YYYY-MM-DD
	const year = lastWeekStartDate.getFullYear();
	const month = String(lastWeekStartDate.getMonth() + 1).padStart(2, '0'); // 月份从0开始
	const day = String(lastWeekStartDate.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}
//获得上周的结束日期
export function getLastWeekEndDate() {

	const now = new Date();
	const currentDayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
	// 如果今天是周日，向前推7天，其他情况向前推当前星期几 + 1
	const daysToSubtract = (currentDayOfWeek === 0) ? 7 : currentDayOfWeek;
	// 计算上周日的日期
	const lastWeekEndDate = new Date(now.setDate(now.getDate() - daysToSubtract));

	// 获取日期部分，格式为 YYYY-MM-DD
	const year = lastWeekEndDate.getFullYear();
	const month = String(lastWeekEndDate.getMonth() + 1).padStart(2, '0'); // 添加前导零
	const day = String(lastWeekEndDate.getDate()).padStart(2, '0'); // 添加前导零
	return `${year}-${month}-${day}`;
}

// 是否为工作日
export function isWorkday() {
	var d = new Date().getDay();
	if ([1, 2, 3, 4, 5].includes(d)) {
		return true
	} else {
		return false
	}
}
//格式化日期：yyyy-MM-dd formatDateFun(Sun Jan 08 2023 00:00:00 GMT+0800 (中国标准时间) )
export function formatDateFun(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();
	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return (myyear + "-" + mymonth + "-" + myweekday);
}
// 秒转为小时分钟  formatSeconds (16620)格式4小时37分 不显示秒
export function formatSeconds(value) {
	var secondTime = parseInt(value); // 秒
	var minuteTime = 0; // 分
	var hourTime = 0; // 小时
	if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
		//获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(secondTime / 60);
		//获取秒数，秒数取佘，得到整数秒数
		secondTime = parseInt(secondTime % 60);
		//如果分钟大于60，将分钟转换成小时
		if (minuteTime > 60) {
			//获取小时，获取分钟除以60，得到整数小时
			hourTime = parseInt(minuteTime / 60);
			//获取小时后取佘的分，获取分钟除以60取佘的分
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	var result = "" + parseInt(secondTime) + "秒";
	if (minuteTime > 0) {
		result = "" + parseInt(minuteTime) + "分钟"; //不加秒
		// result = "" + parseInt(minuteTime) + "分" + result;//加秒
	}
	if (hourTime > 0) {
		result = "" + parseInt(hourTime) + "小时" + result;
	}
	return result;
}

export function setToken(tokenData) {
	uni.setStorageSync('token', tokenData)
}

// 字符串转小时分钟 '1-2' 转为1时2分
export function stringChangeHour(val) {
	if (val) {
		let H = val.split('-')[0]
		let M = val.split('-')[1]
		// if(H<=0){
		// 	return M+'分'
		// }else if(H>0&&M<=0){
		// 	return H+'时'
		// }else{
		if (M < 10) {
			M = '0' + M
		}
		return H + '时' + M + '分'
		// }

	}
}
// rTime('2022-03-09T08:04:09.000Z') 2022年03月09日
export function rTime(date) {
	var now = new Date(parseInt(date * 1000)),
		y = now.getFullYear(),
		m = now.getMonth() + 1,
		d = now.getDate();
	return y + '年' + (m < 10 ? '0' + m : m) + '月' + (d < 10 ? '0' + d : d) + '日'

}

// 时间戳判断是否大于7天 isMemberPoup(1692757743) 返回false表示距离会有过期大于7天
export function isMemberPoup(utc_datetime) {
	let time = utc_datetime * 1000
	let s = time - 604800000; //指定时间7天前的时间戳
	let n = new Date().getTime() //当前时间戳
	if (s - n >= 0) {
		return {
			isremid: false,
			day: 0
		} //day 距离天数
	} else {
		return {
			isremid: true,
			day: Math.ceil((time - new Date().getTime()) / 86400000)
		}
	}
}
// utc时间转时间戳 utc2timestamp('2023-03-09T08:04:09.000Z') 返回false表示距离会有过期大于7天
export function isMemberPoup1(utc_datetime) {
	let json_date = new Date(utc_datetime).toJSON();
	let time = new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
		/\.[\d]{3}Z/, '')
	let s = new Date(time).getTime() - 604800000; //指定时间7天前的时间戳
	let n = new Date().getTime() //当前时间戳
	if (s - n >= 0) {
		return {
			isremid: false,
			day: 0
		} //day 距离天数
	} else {
		return {
			isremid: true,
			day: Math.round((new Date(time).getTime() - new Date().getTime()) / 86400000)
		}
	}
}

// 秒转为小时分钟 不够一分钟时返回 格式0-1 0小时1分钟  大于等于1分钟时 格式 2-1 2小时1分钟  
export function secondformatHour(value) {
	if (value == 0) {
		return '0-0'
	}
	var secondTime = parseInt(value); // 秒
	var minuteTime = 0; // 分
	var hourTime = 0; // 小时
	if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
		//获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(secondTime / 60);
		//获取秒数，秒数取佘，得到整数秒数
		secondTime = parseInt(secondTime % 60);
		//如果分钟大于60，将分钟转换成小时
		if (minuteTime > 60) {
			//获取小时，获取分钟除以60，得到整数小时
			hourTime = parseInt(minuteTime / 60);
			//获取小时后取佘的分，获取分钟除以60取佘的分
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	var result = "" + parseInt(secondTime) + "秒";

	if (minuteTime > 0) {
		result = "" + parseInt(minuteTime) + "分" + result;
	}
	if (hourTime > 0) {
		result = "" + parseInt(hourTime) + "时" + result;
	}
	let pt
	if (result.indexOf("时") != -1 && result.indexOf("分") != -1 && result.indexOf("秒") != -1) {
		pt = result.split('分')[0]
		pt = pt.replace('时', '-')

		if (result.split('分')[1].split('秒')[0] != 0) {
			let f = 1 + parseInt(pt.split('-')[1])
			pt = pt.split('-')[0] + '-' + f
		}
	} else if (result.indexOf("时") == -1 && result.indexOf("分") != -1 && result.indexOf("秒") != -1) {
		pt = result.split('分')[0]
		if (result.split('分')[1].split('秒')[0] != 0) {
			let h = 1 + parseInt(pt)
			pt = '0-' + h
		} else {
			pt = '0-' + pt
		}
	} else if (result.indexOf("时") == -1 && result.indexOf("分") == -1 && result.indexOf("秒") != -1) {
		pt = '0-1'
	} else if (result.indexOf("时") != -1 && result.indexOf("分") == -1 && result.indexOf("秒") != -1) {
		pt = result.replace('时', '-').replace('秒', '')
		if (pt.split('-')[1] > 0) {
			pt = pt.split('-')[0] + '-' + 1
		} else {
			pt = pt.split('-')[0] + '-' + 0
		}
	}
	let ptArr = pt.split('-')
	if (ptArr[1] == 60) {
		pt = parseInt(ptArr[0]) + 1 + '-' + 0
	}
	return pt;
}
// 当前时间转化 2022-11-18 15:06:07
export function getNowDate() {
	let date = new Date();
	let sign2 = ":";
	let year = date.getFullYear() // 年
	let month = date.getMonth() + 1; // 月
	let day = date.getDate(); // 日
	let hour = date.getHours(); // 时
	let minutes = date.getMinutes(); // 分
	let seconds = date.getSeconds() //秒
	let weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
	let week = weekArr[date.getDay()];
	// 给一位数的数据前面加 “0”
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (day >= 0 && day <= 9) {
		day = "0" + day;
	}
	if (hour >= 0 && hour <= 9) {
		hour = "0" + hour;
	}
	if (minutes >= 0 && minutes <= 9) {
		minutes = "0" + minutes;
	}
	if (seconds >= 0 && seconds <= 9) {
		seconds = "0" + seconds;
	}
	return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
}
// 2022-11-18 15:06:07 转换为今天/昨天/时间+星期
export function dateTimeWeek(val) {
	if (val) {
		let strTime = val.split(' ')[0]
		let date = new Date();
		let y = date.getFullYear();
		let m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let nowTime = y + '-' + m + '-' + d

		let dt = new Date(strTime);
		let weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		if (getDaysBetweenDay(strTime, nowTime) == -1) {
			return '今天' + "  " + val.split(' ')[1].split(':')[0] + ':' + val.split(' ')[1].split(':')[1]
		} else if (getDaysBetweenDay(strTime, nowTime) == 1) {
			return '昨天' + "  " + val.split(' ')[1].split(':')[0] + ':' + val.split(' ')[1].split(':')[1]
		} else {
			return m + "月:" + d + '日'
		}
	}
}
export function dateTimeWeekSplite(val) {
	if (val) {
		let strTime = val.split(' ')[0]
		let date = new Date();
		let y = date.getFullYear();
		let m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let nowTime = y + '-' + m + '-' + d
		let dt = new Date(strTime);
		let weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		if (getDaysBetweenDay(strTime, nowTime) == -1) {
			return '今天' + "  " + val.split(' ')[1].split(':')[0] + ':' + val.split(' ')[1].split(':')[1]
		} else if (getDaysBetweenDay(strTime, nowTime) == 1) {
			return '昨天' + "  " + val.split(' ')[1].split(':')[0] + ':' + val.split(' ')[1].split(':')[1]
		} else {
			// return m+"月"+d+'日'
			return val.split(' ')[0].split('-')[1] + "月" + val.split(' ')[0].split('-')[2] + '日  ' + val.split(' ')[1]
				.split(':')[0] + ':' + val.split(' ')[1].split(':')[1]
		}
	}
}
//获取两个日期之间的相差的天数
// * @param dateString1  开始日期 yyyy-MM-dd
//  * @param dateString2  结束日期 yyyy-MM-dd
//  * @returns {number} 如果日期相同 返回一天 开始日期大于结束日期，返回0
export function getDaysBetweenDay(dateString1, dateString2) {
	var startDate = Date.parse(dateString1);
	var endDate = Date.parse(dateString2);
	if (startDate > endDate) {
		return 0;
	}
	if (startDate == endDate) {
		return -1;
	}
	var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
	return days;
}
// 根据出生年月获取年龄  getAge(2020-12-03)
export function getAge(date) {
	var age = "";
	var str = date.replace(/年|月/g, "-").replace(/日/g, "");
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (r == null) return false;
	var d = new Date(r[1], r[3] - 1, r[4]);
	if (
		d.getFullYear() == r[1] &&
		d.getMonth() + 1 == r[3] &&
		d.getDate() == r[4]
	) {
		var Y = new Date().getFullYear();
		age = Y - r[1];
		return age;
	}
}

// 判断当前时间在不在某个时间段内  time_range ("21:30", "23:30", "3:22"); 3:22不在改时间段内
export function time_range(beginTime, endTime, nowTime) {
	let strb = beginTime.split(":");
	if (strb.length != 2) {
		return false;
	}

	let stre = endTime.split(":");
	if (stre.length != 2) {
		return false;
	}

	let strn = nowTime.split(":");
	if (stre.length != 2) {
		return false;
	}
	let b = new Date();
	let e = new Date();
	let n = new Date();

	b.setHours(strb[0]);
	b.setMinutes(strb[1]);
	e.setHours(stre[0]);
	e.setMinutes(stre[1]);
	n.setHours(strn[0]);
	n.setMinutes(strn[1]);

	if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
		return true;
	} else {
		return false;
	}
}
// 结束时间小于开始时间时加次日 (7:00,22:00)
export function timechangestr(startTime1, endTime1) {
	let startTime = [Number(startTime1.split(':')[0]), Number(startTime1.split(':')[1])]
	let endTime = [Number(endTime1.split(':')[0]), Number(endTime1.split(':')[1])]
	let endTimeStr
	if (startTime[0] > endTime[0] || (startTime[0] == endTime[0] && startTime[1] > endTime[1]) || (startTime ===
			endTime) || (startTime[0] === endTime[0] && startTime[1] === endTime[1])) {
		if (endTime1.length < 5) {
			endTimeStr = 0 + endTime1
		} else {
			endTimeStr = endTime1
		}
		return startTime1 + '-' + '次日' + endTimeStr
	} else {
		if (endTime1.length < 5) {
			endTimeStr = 0 + endTime1
		} else {
			endTimeStr = endTime1
		}
		return startTime1 + '-' + endTimeStr
	}


}
// 校验手机号
export function checkPhone(phone) {
	let regPhone = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
	if (regPhone.test(Number(phone))) {
		return false
	} else {
		return true
	}
}
// 数组对象 排序 sortByKey([{key:1.value:'测试'}，{key:2.value:'数据'}]，"key")
export function sortByKey(array, key) {
	return array.sort(function(a, b) {
		var x = a[key] //如果要从大到小,把<,>互换就好
		var y = b[key]
		return x < y ? -1 : x > y ? 1 : 0
	})
}
export function getToken() {
	uni.getStorageSync('token')
}

export function getUser() {
	let userInfo = uni.getStorageSync('userInfo')
	return userInfo ? JSON.parse(userInfo) : null;
}

export function setUser(userInfoData) {
	uni.setStorageSync('userInfo', JSON.stringify(userInfoData));
}

export function clear() {
	let testToken = uni.getStorageSync('testToken')
	uni.clearStorageSync();
	uni.setStorageSync('testToken', testToken)
}
