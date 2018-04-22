let Promise=require("./Promise");

let p=new Promise(function(resolve,reject){
    reject(100);
});
p.then(function(data){
    console.log("data",data);
},function(err){
    console.log("err",err);
})