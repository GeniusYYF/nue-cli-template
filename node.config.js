module.exports = {
    port: 9000,
    users: {
        admin: "a",
        a: "a",
    },
    request: {
        // 云函数：服务端执行
        // 云代码：客户端执行。存储代码块方式，前端eval执行传参，运行环境不定
        codeNames: ["cloud-api/utils/token"],
        codeNameDict: {
            "test-api": {
                test: ["test1"],
            },
        },
    },
};
