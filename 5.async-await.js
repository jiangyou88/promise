let bluebird=require("bluebird");
let fs=require("fs");
let read=bluebird.promisify(fs.readFile);
//用async来修饰函数，aysnc需要配await，await只能promise
//async和await(语法糖)===co+generator
async function  r() {
    let content1=await read("./1.txt","utf8");
    console.log("content1",content1);//content1 ./2.txt
    let content2=await read(content1,"utf8");
    console.log("content2",content2);//content2 hello word
    return content2;
};
//async函数返回的是promise
r().then(function(data){
    console.log(data);//hello word
});

//async/await解决的问题有哪些
//1.回调地狱
//2.并发执行异步，在同一时刻同步返回结果 Promise.all
//3.解决了返回值得问题
//4.可以实现代码try/catch