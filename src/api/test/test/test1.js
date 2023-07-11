function test1(query, res, config) {
    if (query && Object.keys(query).length) {
        res.code = 1;
        res.data = JSON.stringify(query);
        res.msg = "数据为参数"
    } else {
        res.code = 0;
        res.data = {}
        res.msg = "未收到参数"
    }
    return res
}

module.exports = {
    test1
}