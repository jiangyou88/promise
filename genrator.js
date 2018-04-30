//genrator 函数要用*来比标识,yield(暂停 产出)
//他会将函数分割出好多个部分，调用一次next就会继续向下执行
//返回结果是一个迭代器有一个next方法
//yield后面跟着的是value的值
//yield等号前面的是我们当前调用next传进来的值
//第一次next传值是无效的

function *read(){
    console.log(1);
    let a=yield "星期一";
    console.log(a);
    let b=yield "星期二";
    console.log(b);
    return b;
};
let it=read();
console.log(it.next());//{ value: '星期一', done: false }