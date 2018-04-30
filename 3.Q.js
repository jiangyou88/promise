//需要下载 npm install q
// let Q=require("q");
 let fs=require("fs");
// function read(url){
//     return new Promise(function(resolve,reject){
//         fs.readFile(url,"utf8",function(err,data){
//             if(err) reject(err);
//             resolve(data);
//         })
//     })
// }
// Q.all([read("./1.txt"),read("./2.txt"),read("./2.txt")]).then(function(data){
//     console.log(data);
// })
// Q.fcall(function(){
//     return 100
// }).then(function(data){
//     console.log(data);
// })


//blueBird
// npm insatall bluebird

// let bluebird=require("bluebird");
//let read=bluebird.promisify(fs.readFile);
let read=promisify(fs.readFile);
read("./2.txt","utf8").then(function(data){
    console.log(data);//hello word
})
function promisify(fn){
    return function(...args){
        return new Promise(function(resolve,reject){//promise化 将回调函数在内部进行处理
            fn(...args,function(err,data){
                if(err) reject(err);
                resolve(data);
            });
        })
    }
}

//promisifyAll
function promisifyAll(obj){
    Object.keys(obj).forEach(key=>{//es5将对象转化成数组方法
        if(typeof obj[key]==="function"){
            obj[key+"Async"]=promisify(obj[key])
        }
    })
}