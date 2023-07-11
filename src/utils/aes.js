// import * as crypto from 'node:crypto';
const crypto = require("crypto");
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);
const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8');
const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8');

/**
 * AES对称加密函数 aesEncrypt
 * @param data  待加密数据
 * @param key   秘钥
 * @returns 加密数据
 */
function aesEncrypt(data,) {
    const cipher = crypto.createCipheriv('aes192', key, iv);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

/**
 * AES对称解密函数 aesDecrypt
 * @param encrypted  解密字符
 * @param key        秘钥    
 * @returns 解密数据
 */
function aesDecrypt(encrypted,) {
    const decipher = crypto.createDecipheriv('aes192', key, iv);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// 加密
function genSign(src) {
    let sign = '';
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    sign += cipher.update(src, 'utf8', 'hex');
    sign += cipher.final('hex');
    return sign;
}

// 解密
function deSign(sign) {
    let src = '';
    const cipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    src += cipher.update(sign, 'hex', 'utf8');
    src += cipher.final('utf8');
    return src;
}

module.exports = {
    aesEn: aesEncrypt,
    aesDe: aesDecrypt,
    signEn: genSign,
    signDe: deSign
}

