```javascript
require('module-alias/register'); // 定义目录

const config = require("//node.config.js"); // 配置文件
const nueServer = require("nue-server"); // nue-server封装
const api = require("./api"); // 自定义接口实现

nueServer.createServer(api.apiDict, config) // 返回server

console.log("apiDict:", api.apiDict);
