/**
 * Actually this Generator return a iterator..
 * with next function..
 */

function* gen() {
    var a = 'b';
    setTimeout(()=>{console.log('asyncFunc called')}, 100);
    console.log("before suspended ... ");
    yield 'suspended in this line...';
    return a;
}

/**
 * gen() return a Generator Instance, constructor is GeneratorFunction.
 * has methods such as next, return, throw, Symbol : "Generator"
 */

var sleep = function (time, a, b) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(a + b);
        }, time);
    })
};

(async function () {
    // 在这里使用起来就像同步代码那样直观
    console.log('start');
    let asyncResult = await sleep(3000, 1, 1);
    console.log('end, result: ' + asyncResult);
    let anotherAsync = await sleep(2000, asyncResult, 2);
    console.log('end2, result: ' + anotherAsync);
})()
