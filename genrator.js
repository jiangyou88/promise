//genrator 函数要用*来比标识,yield(暂停 产出)
//他会将函数分割出好多个部分，调用一次next就会继续向下执行
//返回结果是一个迭代器有一个next方法
//yield后面跟着的是value的值
//yield等号前面的是我们当前调用next传进来的值
//第一次next传值是无效的

function* read() {
    console.log(1);
    let a = yield "星期一";
    console.log(a);
    let b = yield "星期二";
    console.log(b);
    return b;
};
let it = read();
console.log(it.next()); //{ value: '星期一', done: false }
console.log(it.next()); //{ value: '星期二', done: false }
console.log(it.next()); //{ value: 'undefined', done: true }


//异步 generator主要和promise搭配使用
let bluebird = require("bluebird");
let fs = require("fs");
let read = bluebird.promisify(fs.readFile);

function* r() {
    let content1 = yield read("./1.txt", "utf8");
    let content2 = yield read(content1, "utf8");
    return content2;
}
//npm install co
//let co=require("co");


function co(it) {
    return new Promise(function (resolve, reject) {
        function next(d) {
            let {value,done} = it.next();
            if (!done) {
                value.then(function (data) {
                    next(data) //2.txt
                }, reject)
            } else {
                resolve(value);
            }

        };
        next();
    })
}

co(r()).then(function (data) {
    console.log(data);
})

// let it=r();
// it.next().value.then(function(data){
//     it.next(data).value.then(function(data){
//         console.log(it.next(data).value);
//     });
// });

//generator原理是将一个函数划分成若干个小函数，每次调用时移动指针，内部是一个条件判断，