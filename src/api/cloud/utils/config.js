function token(params, res, config) {
    res.msg = "调用成功"
    res.data = {
        tokenMaxTime: 1000 * 60 * 60 * 24
    }
}

module.exports = {
    token
}