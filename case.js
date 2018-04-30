let Promise=require("./Promise");

//例子1
// let p=new Promise(function(resolve,reject){
//     setTimeout(function(){
//         resolve(100);
//     },1000);
// });
// p.then(function(data){
//     console.log("data",data);
// },function(err){
//     console.log("err",err);
// })


//例子2
let p=new Promise(function(resolve,reject){   
    resolve("jiangyou");
});
p.then(function(data){
    console.log("data",data);
    return "jiangyou2"
},function(err){
    console.log("err",err);
}).then(function(data){
    console.log(data);
})

//1.promise实例可以多次then，当成功后会将then中的成功方法按顺序执行，我们可以将then中的成功的回调和失败的回调存到数组内，当成功时调用成功的数组即可

//2.链式调用，jquery能实现链式调用靠的就是返回this。promise不能返回this,promise实现链式调用靠的是返回一个新的promise

//3.如果then中无论是成功的回调还是失败的回调只要返回了结果就会走下一个then中的成功，如果有错误走下一个then 的失败

//4.如果第一个promise返回一个普通值，会进到下一次then的成功的回调,如果第一个promise返回了一个promise，需要等待返回的promise执行后的结果传递给下一次then中

//5.resolvePromise
//返回的结果和promise是同一个那么永远不会成功和失败
var p=new Promise(function(resolve,reject){
    return p;
});
p.then(function(){
    console.log(1)
},function(err){
    console.log(err)
})

//6.判断x是不是promise，如果x是对象并且x的then方法是函数我们就认为他是一个promise


//7.有些人写的promise可能会即调用成功， 又调用失败 ，如果两个都调用先调用谁另外一个就忽略掉








// let p=new Promise(function(resolve,reject){
//     resolve();
// });
// let p2=p.then(function(){
//     throw new Error("错误");
// });
// p2.then(function(){

// },function(err){
//     console.log(err);
// })


//下载一个Promise的测试库，promises-aplus-tests 文件名
//npm install -g
//promises-aplus-tests 文件名