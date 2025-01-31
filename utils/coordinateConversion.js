// 地图坐标系转换
//定义一些常量
const x_PI = 3.14159265358979324 * 3000.0 / 180.0;
const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;
/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
// export function bd09togcj02(bd_lon, bd_lat) {
//   var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
//   var x = bd_lon - 0.0065;
//   var y = bd_lat - 0.006;
//   var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
//   var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
//   var gg_lng = z * Math.cos(theta);
//   var gg_lat = z * Math.sin(theta);
//   return [gg_lng, gg_lat]
// }
export function bd09togcj02(latitude, longitude) {
  var x = longitude - 0.0065;
  var y = latitude - 0.006; 
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);
  var tencentLng = z * Math.cos(theta);
  var tencentLat = z * Math.sin(theta);
  return [tencentLat, tencentLng];
}
export function wgs84togcj02(lng, lat) {
    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = lat / 180.0 * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    var mglat = lat + dlat;
    var mglng = lng + dlng;
  return [mglng, mglat]
}
function transformlat(lng, lat) {
  var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
  return ret
}

function transformlng(lng, lat) {
  var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
  return ret
}