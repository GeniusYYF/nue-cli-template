const md5 = require("@/utils/md5.js")

function hex_md5({ value }, res, config) {
    if (value) {
        res.msg = "调用成功"
        res.data = md5.hex_md5(value);
    } else {
        res.code = 2
        res.msg = "请传入value"
    }
}

function b64_md5({ value }, res, config) {
    if (value) {
        res.msg = "调用成功"
        res.data = md5.b64_md5(value);
    } else {
        res.code = 2
        res.msg = "请传入value"
    }
}

function str_md5({ value }, res, config) {
    if (value) {
        res.msg = "调用成功"
        res.data = md5.str_md5(value);
    } else {
        res.code = 2
        res.msg = "请传入value"
    }
}

function hex_hmac_md5({ key, value }, res, config) {
    if (value) {
        res.msg = "调用成功"
        res.data = md5.hex_hmac_md5(key, value);
    } else {
        res.code = 2
        res.msg = "请传入 key,value"
    }
}
function b64_hmac_md5({ key, value }, res, config) {
    if (value) {
        res.msg = "调用成功"
        res.data = md5.b64_hmac_md5(key, value);
    } else {
        res.code = 2
        res.msg = "请传入 key,value"
    }
}
function str_hmac_md5({ key, value }, res, config) {
    if (value) {
        res.msg = "调用成功"
        res.data = md5.str_hmac_md5(key, value);
    } else {
        res.code = 2
        res.msg = "请传入 key,value"
    }
}

module.exports = {
    hex_md5, b64_md5, str_md5, hex_hmac_md5, b64_hmac_md5, str_hmac_md5
}