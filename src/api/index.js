const cloud = require("./cloud");
const test = require("./test");

const apiDict = {
    "cloud-api": cloud,
    "test-api": test,
}

module.exports = {
    apiDict
}