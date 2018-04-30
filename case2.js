//let Promise=require("./Promise");

let promise =new Promise(function(resolve,reject){
    resolve();
});
promise.then(function(resolve,reject){
    return new Promise(function(resolve,reject){
        resolve(10);
    })
},function(err){
    console.log(err);
}).then(function(data){
    console.log("flag",data);
},function(err){
    console.log(err,err);
});

//8.promise中值得穿透
// promise.then().then().then(function(data){
//     console.log(data);
// },function(){

// })
//9.promise规范中要求，所有的onFufiled和onRjected都需要异步执行