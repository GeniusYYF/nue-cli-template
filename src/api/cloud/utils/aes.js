const aes = require("@/utils/aes.js")

function aesEn({ value }, res, config) {
    if (value) {
        res.msg = "调用成功"
        res.data = aes.aesEn(value);
    } else {
        res.code = 2
        res.msg = "请传入value"
    }
}

function aesDe({ value }, res, config) {
    if (value) {
        res.msg = "调用成功"
        res.data = aes.aesDe(value);
    } else {
        res.code = 2
        res.msg = "请传入value"
    }
}

function signEn({ value }, res, config) {
    if (value) {
        res.msg = "调用成功"
        res.data = aes.signEn(value);
    } else {
        res.code = 2
        res.msg = "请传入value"
    }
}

function signDe({ value }, res, config) {
    if (value) {
        res.msg = "调用成功"
        res.data = aes.signDe(value);
    } else {
        res.code = 2
        res.msg = "请传入value"
    }
}

module.exports = {
    aesEn, aesDe, signEn, signDe
}