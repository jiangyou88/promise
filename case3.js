let p=new Promise(function(resolve,reject){
    reject("错误")
});
p.then(function(data){

}).catch(function(e){
    console.log(e)
});

let fs=require("fs");
function read(url){
    return new Promise(function(resolve,reject){
        fs.readFile(url,"utf8",function(err,data){
            if(err) reject(err);
            resolve(data);
        })
    })
}
Promise.all([read("./1.txt"),read("./2.txt"),read("./2.txt")]).then(function(data){
    console.log(data);
})