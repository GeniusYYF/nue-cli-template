const fs = require('fs');
const path = require('path');
// const fileURLToPath = require('url').fileURLToPath;
// import * as fs from 'node:fs';
// import * as path from 'node:path';
// import { fileURLToPath } from "node:url"

var Xyt = {};
(function () {
    var utils = {
        hidePrivateVarible: (obj) => {
            for (let k of Object.keys(obj)) {
                if (k.slice(0, 2) === "__")
                    Object.defineProperty(obj, k, { enumerable: false, configurable: false });
            }
        }
    }
    function initBase() {
        var base = {
            __name: "小羊驼封装的nodejs数据库操作对象",
            __versition: "1.0.0",
            __date: new Date(),
            __lastEditTime: "",
            __lastReadTime: "",
            __copyright: " (GeniusXYT)",
            __getNow: function () {
                return new Date().toLocaleString();
            },
        }
        // 基础
        Object.defineProperties(base, {
            createTime: {
                get() {
                    return this.__date.toLocaleString();
                },
                set(val) {
                    console.warn(`the obj property(now) do not be set ${val}.`);
                },
                enumerable: true
            },
            lastReadTime: {
                get() {
                    return this.__lastReadTime;
                },
                enumerable: true
            },
            lastEditTime: {
                get() {
                    return this.__lastEditTime;
                },
                enumerable: true
            },
            remark: {
                get() {
                    this.__lastReadTime = this.__getNow();
                    return this.__remark ? this.__remark + this.__copyright : "";
                },
                set(val) {
                    this.__lastEditTime = this.__getNow();
                    this.__remark = val;
                },
                enumerable: true,
                configurable: true // 可重写 enumerable、configurable、get和set
            }
        });
        //  将带有__命名的变量（默认代表私有变量）隐藏（不可枚举）
        utils.hidePrivateVarible(base);
        return base
    };
    function initFile() {
        // function getFileName(name) { return path.resolve(path.dirname(fileURLToPath(import.meta.url)), name) } // __dirname
        function getFileName(name) { return path.resolve(__dirname, name) }
        function isExists(fileName) {
            if (!fs.existsSync(fileName)) {
                // console.log(this)
                if (Xyt.isLog) console.warn("file not exist:", fileName)
                return false
            }
            return true
        }
        // 读文件
        function readFile(name, opt) {
            const fileName = getFileName(name)
            if (!isExists(fileName)) return

            if (opt && typeof opt.cb === "function") {
                // 异步
                fs.readFile(fileName, opt, (err, data) => {
                    if (err) {
                        if (Xyt.isLog) console.error('readFile error: ', err)
                        cb()
                        return
                    }
                    // data 是二进制类型，需要转换为字符串
                    if (Xyt.isLog) console.log('readFile success: ', fileName, data.toString())
                    opt.cb(JSON.parse(data))
                })
            } else {
                // 同步
                var data = fs.readFileSync(fileName, opt)
                if (Xyt.isLog) console.log('readFileSync success: ', fileName, data)
                return JSON.parse(data)
            }
        }
        // 写文件
        function writeFile(name, content, opt) {
            const fileName = getFileName(name)
            // if (!isExists(fileName)) return

            if (opt && typeof opt.cb === "function") {
                // 异步
                fs.writeFile(fileName, content, opt, (err) => {
                    if (err) {
                        if (Xyt.isLog) console.error('writeFile error: ', err)
                        return
                    }
                    if (Xyt.isLog) console.log('writeFile success: ', fileName, content)
                    opt.cb(content)
                })
            } else {
                // 同步
                fs.writeFileSync(fileName, content, opt)
                if (Xyt.isLog) console.log('writeFileSync success: ', fileName, content)
                return content
            }
        };
        // 创建目录
        function mkdir(name, opt) {
            const nameDir = getFileName(name)
            if (isExists(nameDir)) return

            if (opt && typeof opt.cb === "function") {
                fs.mkdir(nameDir, error => {
                    if (error) {
                        if (Xyt.isLog) console.error("create dir error:", nameDir, error);
                        return;
                    }
                    if (Xyt.isLog) console.log("create dir success:", nameDir)
                    opt.cb(nameDir)
                })
            }
            else {
                if (Xyt.isLog) console.log("create sync dir success:", nameDir)
                fs.mkdirSync(nameDir)
            }
        };
        // 文件拷贝
        function copyFile(name1, name2, opt) {
            const fileName = getFileName(name1)
            const fileNewName = getFileName(name2)
            if (!isExists(fileName)) return

            if (opt && typeof opt.cb === "function") {
                // 异步
                fs.copyFile(fileName, fileNewName, () => {
                    if (Xyt.isLog) console.log('copyFile success:', fileName, fileNewName)
                    opt.cb(true)
                })
            } else {
                // 同步
                fs.copyFileSync(fileName, fileNewName)
                if (Xyt.isLog) console.log('copyFileSync success:', fileName, fileNewName)
                return true
            }
        };
        // 重命名、剪切（移动）
        function rename(name1, name2, opt) {
            const fileName = getFileName(name1)
            const fileNewName = getFileName(name2)
            if (!isExists(fileName)) return

            if (opt && typeof opt.cb === "function") {
                // 异步
                fs.rename(fileName, fileNewName, () => {
                    if (Xyt.isLog) console.log('rename success:', fileName, fileNewName)
                    opt.cb(true)
                })
            } else {
                // 同步
                fs.renameSync(fileName, fileNewName)
                if (Xyt.isLog) console.log('renameSync success:', fileName, fileNewName)
                return true
            }
        };
        // 检测是文件还是目录(目录 文件是否存在)
        function stat(name, opt) {
            const fileName = getFileName(name)
            if (!isExists(fileName)) return

            if (opt && typeof opt.cb === "function") {
                // 异步
                fs.stat(fileName, (error, stats) => {
                    if (error) {
                        if (Xyt.isLog) console.error('stat error: ', error)
                        opt.cb(0)
                        return
                    }
                    if (Xyt.isLog) console.log('stat success:', fileName)
                    opt.cb(stats.isFile() ? 1 : 2)
                })
            } else {
                // 同步
                var stats = fs.statSync(fileName)
                if (Xyt.isLog) console.log('statSync success:', fileName,)
                return stats.isFile() ? 1 : 2
            }
        };
        // 删除文件
        function unlink(name, opt) {
            const fileName = getFileName(name)
            if (!isExists(fileName)) return

            if (opt && typeof opt.cb === "function") {
                // 异步
                fs.unlink(fileName, (error) => {
                    if (error) {
                        if (Xyt.isLog) console.error('unlink error: ', error)
                        return
                    }
                    if (Xyt.isLog) console.log('unlink success:', fileName)
                    opt.cb(true)
                })
            } else {
                // 同步
                fs.unlinkSync(fileName)
                if (Xyt.isLog) console.log('unlinkSync success:', fileName)
                return true
            }
        };
        // 删除文件目录
        function rmdir(name, opt) {
            const fileName = getFileName(name)
            if (!isExists(fileName)) return

            if (opt && typeof opt.cb === "function") {
                // 异步
                fs.rmdir(fileName, (error) => {
                    if (error) {
                        if (Xyt.isLog) console.error('rmdir error: ', error)
                        return
                    }
                    if (Xyt.isLog) console.log('rmdir success:', fileName)
                    opt.cb(true)
                })
            } else {
                // 同步
                fs.rmdirSync(fileName)
                if (Xyt.isLog) console.log('rmdirSync success:', fileName)
                return true
            }
        };
        // 删除文件目录和其下所有文件
        function rmdirAll(name) {
            const fileName = getFileName(name)
            if (!isExists(fileName)) return
            var files = fs.readdirSync(fileName);
            var curPath = ""
            files.forEach(function (file) {
                curPath = fileName + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    rmdirAll(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(fileName);
        }
        // r	读取文件，如果文件不存在则抛出异常。
        // r+	读取并写入文件，如果文件不存在则抛出异常。
        // rs	读取并写入文件，指示操作系统绕开本地文件系统缓存。
        // w	写入文件，文件不存在会被创建，存在则清空后写入。
        // wx	写入文件，排它方式打开。
        // w+	读取并写入文件，文件不存在则创建文件，存在则清空后写入。
        // wx+	和 w+ 类似，排他方式打开。
        // a	追加写入，文件不存在则创建文件。
        // ax	与 a 类似，排他方式打开。
        // a+	读取并追加写入，不存在则创建。
        // ax+	与 a+ 类似，排他方式打开。
        // encoding（编码，默认为 null）
        // flag（标识位）
        //  mode（权限位，默认为 0o666）

        var file = {
            __lastReadFile: "",
            __lastWriteFile: "",
            __defaultReadOpt: { flag: 'r', encoding: "utf8" },
            __defaultWriteOpt: { flag: 'w', encoding: "utf8" },
            // 操作文件能力
            readFile: function (name, opt) {
                this.__lastReadFile = name;
                opt = Object.assign(this.__defaultReadOpt, opt || {})
                return readFile(name, opt)
            },
            writeFile: function (name, content, opt) {
                this.__lastWriteFile = name;
                opt = Object.assign(this.__defaultWriteOpt, opt || {})
                return writeFile(name, content, opt)
            },
            isExists,
            mkdir,
            copyFile,
            rename,
            stat,
            unlink,
            rmdir,
            rmdirAll,
        }
        utils.hidePrivateVarible(file);
        return file
    };
    function initSql() {
        var file
        function init(config = {}) {
            config = Object.assign(this.__defaultConfig, config)
            this.__defaultConfig.isLogin = false
            file = Xyt.file
            if (config.user === "root" && config.pwd === "root") {
                this.__defaultConfig.isLogin = true
            } else if (file.isExists(".xyt") && file.isExists(".xyt/.user.xyt")) {
                var list = this.selectData({ t: ".xyt/.user.xyt" })
                for (let item of list) {
                    if (item.user === config.user && item.pwd === config.pwd) {
                        this.__defaultConfig.isLogin = true
                        break
                    }
                }
            }
            if (this.__defaultConfig.isLogin) {
                console.info(`welcome,${config.user}!`)
            } else {
                console.warn("user or pwd error,please init again!")
            }
            Object.defineProperty(this.__defaultConfig, "isLogin", {
                writable: false, enumerable: false, configurable: false
            })
        }
        function createDb({ d = "" }) {
            var name = d || this.__defaultConfig.database
            if (file.isExists(name)) { return false }
            file.mkdir(name);
        }
        function deleteDb({ d = "" }) {
            var name = d || this.__defaultConfig.database
            if (!file.isExists(name)) { return false }
            file.rmdirAll(name)
        }
        function createTable({ t = "", d = "", ks = [], vs = [] }) {
            var name = ""
            if (d) {
                if (t) { name = d + "/" + t }
                else { name = d + "/" + this.__defaultConfig.table }
            } else {
                if (t) { name = this.__defaultConfig.database + "/" + t }
                else { name = this.__defaultConfig.database + "/" + this.__defaultConfig.table }
            }
            if (file.isExists(name)) { return false }
            var dict = { _keys: ks, _ids: [], data: {} }

            for (let i = 0; i < ks.length; i++) {
                dict.data[ks[i]] = []
            }
            for (let item of vs) {
                for (let k of ks) {
                    dict.data[k].push(item[k] || "")
                }
                dict._ids.push(item.id)
            }
            file.writeFile(name, JSON.stringify(dict), { flag: 'w' })
        }
        function deleteTable({ t = "" }) {
            var name = t || (this.__defaultConfig.database + "/" + this.__defaultConfig.table)
            if (!file.isExists(name)) { return false }
            file.unlink(name)
        }
        function selectData({ t = "", k = "__null", v = "", vs = [], indexs = [], all = true, cb = "" },) {
            var name = t || (this.__defaultConfig.database + "/" + this.__defaultConfig.table)
            if (!file.isExists(name)) { return false }
            if (cb) {
                file.readFile(name, {
                    cb: (res) => { main(res, { k, v, vs, indexs, all, cb }) }
                })
            } else {
                return main(file.readFile(name), { k, v, vs, indexs, all, cb })
            }
            function main(res, { k, v, vs, indexs, all, cb }) {
                // res = JSON.parse(res)
                var i = 0, data = [], row = {}, list = res.data[k] || res._ids || []

                for (let item of list) {
                    if ((k === "__null" && indexs.length === 0) || indexs.includes(i) || (v && item === v) || vs.includes(item)) {
                        row = {}
                        for (let _k of res._keys) {
                            row[_k] = res.data[_k][i]
                        }
                        data.push(row)
                        if (!all) break
                    }
                    i++
                }
                return cb ? cb(data) : data
            }
        };
        function addData({ t = "", vs = [], cb = "" }) { };
        function updateData({ t = "", vs = [], cb = "" }) { };
        function deleteData({ t = "", indexs = [], k = "", vs = [], cb = "" }) {
            var name = t || (this.__defaultConfig.database + "/" + this.__defaultConfig.table)
            if (!file.isExists(name)) { return false }
            if (cb) {
                file.readFile(name, {
                    cb: (res) => { main(res, { indexs, k, vs, cb }) }
                })
            } else {
                return main(file.readFile(name), { indexs, k, vs, cb })
            }
            function main(res, { indexs, k, v, vs, cb }) {
                // res = JSON.parse(res)
                // 计算索引
                if (indexs.length === 0) {
                    res.data[k].forEach((_, i) => {
                        if (v === _ || vs.includes(_)) {
                            // 更新ids
                            res._ids.splice(i, 1)
                            indexs.push(i)
                        }
                    })
                }
                for (let _k of res._keys) {
                    res.data[_k] = res.data[_k].filter((_, i) => !indexs.includes(i))
                }
                file.writeFile(name, JSON.stringify(res))
                return cb ? cb(true) : true
            }
        };
        function addUser({ user = "", pwd = "", path = "" }) {
            if (!user || !pwd) {
                console.warn("addUser error,please do again!")
                return
            }
            file = Xyt.file
            var d = path ? path + "/.xyt" : ".xyt"
            var t = ".user.xyt"
            var name = d + "/" + t
            if (!file.isExists(d)) {
                console.log("create db")
                this.createDb({ d: d, })
            }
            if (!file.isExists(name)) {
                console.log("create table")
                this.createTable({ d, t, ks: ["id", "user", "pwd"], vs: [] })
            }
            // file.writeFile(name, JSON.stringify({ user, pwd }), { flag: 'a' })
            // this.addData({ d, t, vs })
            if (!this.__defaultConfig.isLogin) file = {}
        };

        var sql = {
            __defaultConfig: {
                user: "root",
                pwd: "root",
                database: "defaultDb",
                table: "defaultTable",
                isLogin: false,
            },
            init,
            createDb,
            deleteDb,
            createTable,
            deleteTable,
            selectData,
            addData,
            updateData,
            deleteData,
            addUser,
        }
        utils.hidePrivateVarible(sql)
        return sql
    };
    Xyt = {
        isLog: true, utils, base: initBase(), file: initFile(), sql: initSql()
    };
})();

// export default Xyt;
module.exports = Xyt
// global.Xyt = Xyt

// =========================file api===============================
// 读取
// Xyt.file.readFile("cs.txt", {
//     cb: (v) => {
//         console.log(v)
//     }
// })
// console.log("res-async:", Xyt.file.readFile("cs.txt"))

// 写入
// Xyt.file.writeFile("cs.txt", "333...")
// Xyt.file.writeFile("cs.txt", "333...", {
//     cb: (v) => {
//         console.log("write end:", v)
//     }
// })

// 创建目录
// Xyt.file.mkdir("cs")
// Xyt.file.mkdir("cs2", (path) => { console.log(path) })

// 拷贝
// Xyt.file.copyFile("cs.txt", "cs.txt", {
//     cb: (isSuccess) => {
//         if (isSuccess) {
//             console.log("copy success cb...")
//         }
//     }
// })

// 重命名、剪切（移动）
// Xyt.file.rename("cs.txt", "cs2.txt", { cb: (v) => { console.log(v) } })
// Xyt.file.rename("cs2.txt", "cs/cs2.txt")

// 检测是文件还是目录(目录 文件是否存在)
// console.log(Xyt.file.stat("cs.txt"))
// console.log(Xyt.file.stat("cs"))
// Xyt.file.stat("cs", { cb: (v) => { console.log(v) } })

// 删除文件
// Xyt.file.unlink("cs-copy.txt")
// Xyt.file.unlink("cs-copy.txt", { cb: (v) => { console.log(v) } })

// 删除文件目录
// Xyt.file.rmdir("cs2", { cb: (v) => { console.log(v) } })

// =========================sql api===============================
console.time("sqlStart")
// Xyt.sql.addUser({ user: "xyt", pwd: "123456", path: "" })
var config = {
    // user: "xyt",
    // pwd: "123456",
    // database: "",
    // table: "",
}
Xyt.sql.init(config);
Xyt.isLog = false
// Xyt.sql.deleteDb({})
// 创建database
// var table1Keys = ["id", "name", "sex"]
// var table1Vals = [
//     { id: "1", name: "测试", sex: "男" },
//     { id: "2", name: "", sex: "男" },
//     { id: "3", name: "测试3", sex: "女" },
//     { id: "4", name: "测试4" },
// ]
// Xyt.sql.createDb({ d: "",  })
// Xyt.sql.createTable({ t: "", ks: table1Keys, vs: table1Vals })

// Xyt.sql.selectData({
//     t: "", k: "sex", v: "男", all: true, cb: (data) => {
//         console.log(data)
//     }
// })
// console.log(Xyt.sql.selectData({ t: "", k: "sex", v: "男", all: false, }))
// console.log(Xyt.sql.selectData({ t: "", k: "sex", v: "男", vs: ["女"] }))
console.log(Xyt.sql.selectData({ t: "", indexs: [0] }))
console.timeEnd("sqlStart")

// Xyt.sql.deleteData( {"",  indexs: [0] })
// Xyt.sql.deleteData({ t: "", k: "id",v:"", vs: [2,4,5] })


// Xyt.sql.deleteTable()
