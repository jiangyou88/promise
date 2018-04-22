function Promise(executor){//excutor是一个执行函数
    let self=this;
    self.status="pending";
    self.value=undefined;//默认成功的值
    self.reason=undefined;//默认失败的原因
    function resolve(value){//成功状态
        if(self.status==="pending"){
            self.status="resolved";
            self.value=value;
        }
    };
    function reject(reason){//失败状态
        if(self.status==="pending"){
            self.status="rejected";
            self.reason=reason;
        }
    };
    executor(resolve,reject);
};
Promise.prototype.then=function(onFulfilled,onRjected){
    let self=this;
    if(self.status==="resolved"){
        onFulfilled(self.value);
    }
    if(self.status==="rejected"){
        onRjected(self.reason);
    }
};
module.exports=Promise;