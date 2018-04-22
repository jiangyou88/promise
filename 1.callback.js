//异步的发展流程:
//异步：先干一件事 中间去干其他的事，最终在回来干这件事 同步：连续执行
//node支持异步
//callback -> promise -> generator -> co -> asyn+await(语法糖)
//读文件读到后在去写文件

let fs = require("fs");
//1.异步不支持try/catch只针对同步代码

fs.readFile("./1.txt", "utf8", function (err, data) { //error-first
    fs.readFile(data, "utf8", function (err, data) { //error-first
        console.log(data); //hello word
    })
});

//2.并行 无法在同一时刻合并两个异步的结果，异步方案不支持return

fs.readFile("./1.txt", "utf8", function (err, data) {
    console.log(data);
});
fs.readFile("./2.txt", "utf8", function (err, data) {
    console.log(data);
});


//高阶函数:
//函数可以作为参数或者函数还可以作为返回值
//判断数据类型 isType

function isType(type, content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`;
}
console.log(isType("String", "hello")); //true

//1.批量生成函数
function isType(type) {
    return function (content) {
        return Object.prototype.toString.call(content) === `[object ${type}]`;
    }
}
let isString = isType("String");
let isArray = isType("Array");

console.log(isString("hello")); //true
console.log(isArray([])); //true

//2.预置函数作为参数 loadsh _.after

function after(time, callback) {
    return function () {
        if (--time === 0) {
            callback();
        }
    }
};
let eat = after(3, function () {
    console.log("饱了");
});
eat();
eat();
eat();


let fs = require("fs");
function after(times, callback) { //可以缓存函数，当达到条件时执行
    let arr = [];
    return function (data) {
        arr.push(data);
        if (--times === 0) {
            callback(arr);
        }
    }
};
let out = after(3, function (arr) {
    console.log(arr);
})
fs.readFile("./1.txt", "utf8", function (err, data) {
    out(data);
});
fs.readFile("./2.txt", "utf8", function (err, data) {
    out(data);
});

//promise 解决了回调地狱的问题，不会导致难以维护 then
//解决同步异步的返回结果，按照顺序