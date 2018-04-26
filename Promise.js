function Promise(executor){//excutor是一个执行函数
    let self=this;
    self.status="pending";
    self.value=undefined;//默认成功的值
    self.reason=undefined;//默认失败的原因
    self.onResolvedCallbacks=[];//存放then成功的回调
    self.onRejectedCallbacks=[];//存放then失败的回调
    function resolve(value){//成功状态
        if(self.status==="pending"){
            self.status="resolved";
            self.value=value;
            self.onResolvedCallbacks.forEach(function(fn){
                fn();
            });
        }
    };
    function reject(reason){//失败状态
        if(self.status==="pending"){
            self.status="rejected";
            self.reason=reason;
            self.onRejectedCallbacks.forEach(function(fn){
                fn();
            })
        }
    };
    try{
        executor(resolve,reject);
    }catch(e){//捕获的时候发生异常，就直接失败了
        reject(e);
    }
    
};
function resolvePromise(p2,x,resolve,reject){
    //有可能这里返回的x是别人的promise
    //尽可能允许其他人乱写
    if(p2===x){//这里应该报一个类型错误，有问题
        return reject(new TypeError("循环引用了"));
    }
    //看x是不是一个promise，promise应该是一个对象
    if(x!=null||(typeof x==="object"||typeof x==="function")){
        //可能是promise {}，看这个对象中是否有then方法，如果有then我就认为他是promise了  
        try{
            let then=x.then;
            if(typeof then==="function"){
                then.call(x,function(y){
                    //y可能还是一个promise，在去解析直到返回的是一个普通值
                    resolvePromise(p2,x,resolve,reject);
                },function (err) {
                       reject(err); 
                });
            }else{
                resolve(x);
            }
        }catch(e){
            reject(e);
        }

    }else{//说明是一个普通值1
        resolve(x);//表示成功了
    }
};
Promise.prototype.then=function(onFulfilled,onRjected){
    let self=this;
    let promise2;//返回的promise
    if(self.status==="resolved"){
        promise2=new promise(function(resolve,reject){
            //当成功或者失败执行时有异常那么返回的promise应该处于失败状态
            //x可能是一个promise也有可能是一个普通的值
            try{
                let x=onFulfilled(self.value);
                //x可能是别人promise，写一个方法统一处理
                resolvePromise(promise2,x,resolve,reject);
            }catch(e){
                reject(e);//reject指的是promise2的失败
            }; 
        });
        
    }
    if(self.status==="rejected"){
        promise2=new promise(function(resolve,reject){
            try{
                let x=onRjected(self.reason);
                resolvePromise(promise2,x,resolve,reject);
            }catch(e){
                reject(e);
            };           
        });       
    }
    //当调用then时可能没成功，也没失败
    if(self.status==="pending"){
        promise2=new promise(function(resolve,reject){
            self.onResolvedCallbacks.push(function(){
                try{
                    let x=onFulfilled(self.value);
                    resolvePromise(promise2,x,resolve,reject);
                }catch(e){
                    reject(e);
                }               
            });
            self.onRejectedCallbacks.push(function(){
                try{
                    let x=onRjected(self.reason);
                    resolvePromise(promise2,x,resolve,reject);
                }catch(e){
                    reject(e);
                }               
            });
        });     
    }
};
module.exports=Promise;