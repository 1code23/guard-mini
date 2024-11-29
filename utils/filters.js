export function hotNumber(val) {
	const num = parseInt(val);
	if (num < 1000) {
		return num;
	} else {
		val = val + "";
		return val.substr(0, val.length - 3) + 'K';
	}
}
export function classifyArr(str){
	if(str){
		return str.split(',')[1]
	}else{
		return str
	}
}
// 手机号中间位数隐藏
export function geTel(tel) {
	if (tel) {
		tel = tel.toString()
		let reg = /^(\d{3})\d{4}(\d{4})$/;
		return tel.replace(reg, "$1****$2");
	}
}
// 去除尾部3位  012346  得到012
export function strSlice(str) {
	return str.slice(0, str.length - 3)
}
// 金额三位数分割
export function numSplit(num) {
	if (!num || !(num > 0)) return num
	let decimalPart = '';
	num = num.toString();
	if (num.indexOf('.') != -1) {
		decimalPart = '.' + num.split('.')[1];
		num = parseInt(num.split('.')[0]);
	}
	let array = num.toString().split('');
	let index = -3;
	while (array.length + index > 0) {
		array.splice(index, 0, ',');
		index -= 4;
	}
	return array.join('') + decimalPart;
}

//枚举值转换
export function typeDesc(key, list = []) {
	return (list.find((item) => item.key === key) || {}).value || key
}
export function typeSrc(type, list = []) {
	return (list.find((item) => item.type === type) || {}).src || type
}
export function typetext(id, list = []) {
	return (list.find((item) => item.id === id) || {}).text || id
}

//时间转换 
// 2022-11-18 15:06:07 转换为今天/昨天/时间+星期
export function dateWeek(val) {
	if (val) {
		let strTime = val.split(' ')[0]
		// let date = new Date()
		// let nowTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    let date = new Date();
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	let nowTime=y + '-' + m + '-' + d

		let dt = new Date(strTime);
		let weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		if (getDaysBetween(strTime, nowTime) == -1) {
			return '今天' + "  " + weekDay[dt.getDay()]
		} else if (getDaysBetween(strTime, nowTime) == 1) {
			return '昨天' + "  " + weekDay[dt.getDay()]
		} else {
			return strTime + "  " + weekDay[dt.getDay()]
		}
	}
}
// 分钟转小时分  minutesHour(60) 1时0分
export function minutesHour(minutes) {
	if (minutes) {
		return (Math.floor(minutes / 60) + "小时" + (minutes % 60) + "分")
	} else {
		return minutes
	}
}
export function formatSecondsUpfilter(seconds){
	const totalSeconds = parseInt(seconds);
	 if (totalSeconds === 0) {
	   return '0分钟';
	 }
	 let hours = 0;
	 let minutes = 0;
	 
	 if (totalSeconds >= 60) {
		minutes = Math.floor(totalSeconds / 60);
		
		// 如果秒数大于0,则分钟加1
		if (totalSeconds % 60 > 0) {
		  minutes += 1;
		}
		
		if (minutes >= 60) {
		  hours = Math.floor(minutes / 60);
		  minutes = minutes % 60;
		}
	 }
	 
	 // 如果总秒数小于60,返回小于1分钟
	 if (totalSeconds < 60) {
		return '<1分钟';
	 }
	 
	 let result = '';
	 if (hours > 0) {
		result += `${hours}小时`;
	 }
	 if (minutes > 0) {
		result += `${minutes}分钟`;
	 }
	 
	 return result;
}
// 秒转为时分
export function formatSecondsfilter(seconds) {
	  const totalSeconds = parseInt(seconds, 10);
	  // 当 seconds 为 0 时返回 "0分钟"
	    if (totalSeconds === 0) {
	      return '0分钟';
	    }
	    let hours = 0;
	    let minutes = 0;
	  
	    if (totalSeconds >= 60) {
	      minutes = Math.floor(totalSeconds / 60);
	      
	      // 计算小时数
	      if (minutes >= 60) {
	        hours = Math.floor(minutes / 60);
	        minutes = minutes % 60;
	      }
	    }
	  
	    // 小于60秒时返回"<1分钟"
	    if (totalSeconds < 60) {
	      return '<1分钟';
	    }
	    // 60秒到119秒之间返回"1分钟"
	    if (totalSeconds >= 60 && totalSeconds < 120) {
	      return '1分钟';
	    }
	    
	    let result = '';
	    if (hours > 0) {
	      result += `${hours}小时`;
	    }
	    if (minutes > 0 || hours > 0) { // 显示分钟，小时非零时也显示分钟
	      result += `${minutes}分钟`;
	    }
	  return result;
	  // 以上是超过1分钟不到2分钟显示1分钟
	  // 以下代码是超过1分钟不到2分钟显示2分钟
 // const totalSeconds = parseInt(seconds);
  
 //  let hours = 0;
 //  let minutes = 0;
  
 //  if (totalSeconds >= 60) {
	// minutes = Math.floor(totalSeconds / 60);
	
	// // 如果秒数大于0,则分钟加1
	// if (totalSeconds % 60 > 0) {
	//   minutes += 1;
	// }
	
	// if (minutes >= 60) {
	//   hours = Math.floor(minutes / 60);
	//   minutes = minutes % 60;
	// }
 //  }
  
 //  // 如果总秒数小于60,返回小于1分钟
 //  if (totalSeconds < 60) {
	// return '<1分钟';
 //  }
  
 //  let result = '';
 //  if (hours > 0) {
	// result += `${hours}小时`;
 //  }
 //  if (minutes > 0) {
	// result += `${minutes}分钟`;
 //  }
  
 //  return result;
}
//获取两个日期之间的相差的天数
// * @param dateString1  开始日期 yyyy-MM-dd
//  * @param dateString2  结束日期 yyyy-MM-dd
//  * @returns {number} 如果日期相同 返回一天 开始日期大于结束日期，返回0
export function getDaysBetween(dateString1, dateString2) {
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
// 秒转为时分秒
export function secTotime(s) {
	let t = '';
	if (s > -1) {
		let hour = Math.floor(s / 3600)
		let min = Math.floor(s / 60) % 60
		let sec = s % 60
		if (hour < 10) {
			t = '0' + hour + ":"
		} else {
			t = hour + ":"
		}
		if (min < 10) {
			t += "0"
		}
		t += min + ":"
		if (sec < 10) {
			t += "0"
		}
		t += sec.toFixed(0)
	}
	return t
}
// // utcToString('1692757743') 2022-03-09 08:04:09
// export function utcToString(dateTime) {
// 	// let json_date = new Date(date).toJSON();
// 	// let time = new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
// 	// 	/\.[\d]{3}Z/, '')
// 	// return time
// 	let date = new Date(dateTime*1000);
// 	console.log(date);
// 	Y = date.getFullYear() + '-';
// 	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
// 	D = date.getDate() + ' ';
// 	h = date.getHours() + ':';
// 	m = date.getMinutes() + ':';
// 	s = date.getSeconds();
// 	return Y+'-'+M+'-'+D+' '+h+':'+m+':'+s
// }
// utcToString('2022-03-09T08:04:09.000Z') 2022-03-09 08:04:09
export function utcToString(date) {
	let json_date = new Date(date).toJSON();
	let time = new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
		/\.[\d]{3}Z/, '')
	return time
}
export function payStatus(val){
	if(val=='created'){
		return '待支付'
	}else if(val=='success'){
		return '支付成功'
	}else if(val=='failed'){
		return '支付成功'
	}else{
		return ''
	}
}
// dateSplit(2023-02-25)时间格式转换   02.25
export function dateSplit(val){
	if(val){
		let time=val.split('-')
		return time[1]+'.'+time[2]
	}else{
		return
	}
}
// 分钟小于0 前面补0
export function minStr(s) {
	if(typeof(s)==='number'){
		if(s<10){
		return '0'+s
		}else{
		return s
	}	
	}else{
	if(s.length<=1){
		return '0'+s
	}else{
		return s
	}	
	}
	
}
// 星期过滤
export function weekFilter(week) {
	if(week=='周一,周二,周三,周四,周五'){
		return '周一至周五'
	}else if(week=='周一,周二,周三,周四,周五,周六'){
		return '周一至周六'
	}else if(week=='周一,周二,周三,周四,周五,周六,周日'){
		return '周一至周日'
	}else if(week=='周二,周三,周四,周五,周六'){
		return '周二至周六'
	}else if(week=='周二,周三,周四,周五,周六,周日'){
		return '周二至周日'
	}else if(week=='周三,周四,周五,周六,周日'){
		return '周三至周日'
	}else{
		return week
	}
}