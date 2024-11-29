import Vue from 'vue'
import CryptoJS from 'crypto-js'
// import { Base64 } from '@/utils/index.js';
let keyStr = "g7Z1pjDI@v4KTUghx6^LvWr7cUurT5cq";//加密密钥
let ivStr  = "uYfHR3ydBBnnI&K0";//矢量

// 加密
export function aes_encrypt(word){ 
    keyStr = keyStr ? keyStr : 'g7Z1pjDI@v4KTUghx6^LvWr7cUurT5cq';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);
	var iv   = CryptoJS.enc.Utf8.parse(ivStr);
    // var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(word, key, {
		iv:iv,
		mode:CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
    // return encrypted;
}

//解密  
export function aes_decrypt(word){  
    keyStr = keyStr ? keyStr : 'g7Z1pjDI@v4KTUghx6^LvWr7cUurT5cq';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);//
	var iv   = CryptoJS.enc.Utf8.parse(ivStr);
	// const restoreBase64 = word.replace(/\-/g,'+').replace(/_/g,'/');
	var restoreBase64=word.replace(/[\r\n]/g,'');
    var decrypt = CryptoJS.AES.decrypt(restoreBase64, key, {
		iv:iv,
		mode:CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    // return CryptoJS.enc.Utf8.stringify(decrypt);

}

// let key = "g7Z1pjDI@v4KTUghx6^LvWr7cUurT5cq";//加密密钥
// let iv  = "uYfHR3ydBBnnI&K0";//矢量
// //解密方法
// export function aes_decrypt(text) {
//     let baseResult = CryptoJS.enc.Base64.parse(text);   // Base64解密
//     let ciphertext = CryptoJS.enc.Base64.stringify(baseResult);     // Base64解密
//     let decryptResult = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {    //  AES解密
//       iv: CryptoJS.enc.Utf8.parse(iv),
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     });
//     let resData = decryptResult.toString(CryptoJS.enc.Utf8).toString();
//     return resData;
// }

// //加密方法
// export function aes_encrypt(text) {
//     var srcs = CryptoJS.enc.Utf8.parse(text);
//     var encrypted= CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(key), {
//         iv: CryptoJS.enc.Utf8.parse(iv),
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     })
//     return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
// }

